const [siteId, jwpApiSecret, medalApiSecret, dryRun] = process.argv.slice(2);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (!siteId || !jwpApiSecret || !medalApiSecret) {
	console.error('Required arguments are missing');
	console.info(`Usage example:
		node jwp-media-update.js [site-id] [jwp-api-secret] [medal-api-secret] [[dry-run]]
	`);
	process.exit(1);
}

const jwpApiUrl = `https://api.jwplayer.com/v2/sites/${siteId}`;
const jwpRequestHeaders = {
	accept: 'application/json',
	'content-type': 'application/json',
	authorization: jwpApiSecret,
};

const medalApiUrl = `https://api-v2.medal.tv/syndication`;
const medalRequestHeaders = {
	accept: 'application/json',
	'X-Authentication': medalApiSecret,
};

function fetchDynamicPlaylists() {
	const query = new URLSearchParams({
		page: 1,
		page_length: 100,
		q: 'playlist_type:dynamic',
	});
	console.group('Fetching playlists...');
	console.debug(query);
	return fetch(`${jwpApiUrl}/playlists?${query}`, { headers: jwpRequestHeaders })
		.then((response) => response.json())
		.then(({ total, playlists }) => {
			console.log(`Found ${total} dynamic playlists`);
			return playlists.map((playlist) => playlist.id);
		})
		.catch((err) => console.error(err))
		.finally(() => console.groupEnd());
}

function fetchDynamicPlaylist(playlistId) {
	return fetch(`${jwpApiUrl}/playlists/${playlistId}/dynamic_playlist`, { headers: jwpRequestHeaders })
		.then((response) => response.json())
		.catch((err) => console.error(err));
}

async function collectTagsToInclude(playlistIds) {
	const tags = [];
	for (const playlistId of playlistIds) {
		const {
			metadata: { tag_filter: tagFilter },
		} = await fetchDynamicPlaylist(playlistId);
		tags.push(...tagFilter?.include?.values);
		await delay(1000);
	}
	return tags.filter((value, index, arr) => arr.indexOf(value) === index && value !== 'medal-approved');
}

function fetchMediaByTags(tags) {
	const query = new URLSearchParams({
		page: 1,
		page_length: 1000,
		q: `tags:(${tags.join(' OR ')})`,
	});
	console.group('Fetching media...');
	console.debug(query);
	return fetch(`${jwpApiUrl}/media?${query}`, { headers: jwpRequestHeaders })
		.then((response) => response.json())
		.then(({ total, media }) => {
			console.log(`Found ${total ?? 0} media`);
			return media;
		})
		.catch((err) => console.error(err))
		.finally(() => console.groupEnd());
}

async function refreshMediaContent(media) {
	const mapping = media.map((video) => {
		const contentId = video.metadata.custom_params.import_guid.split('/').filter(Boolean).pop();
		return { media: video, contentId };
	});

	const contentIds = mapping.map((item) => item.contentId);

	console.group('Refreshing media content on Medal...');
	const response = await fetch(`${medalApiUrl}/content/refresh`, {
		method: 'POST',
		headers: medalRequestHeaders,
		body: JSON.stringify({ contentIds }),
	});
	const refreshedClips = await response.json();
	console.log(`Received ${refreshedClips.length} refreshed clips`);
	console.groupEnd();

	return { mapping, refreshedClips };
}

async function updateMediaInJWPlayer({ mapping, refreshedClips }) {
	console.group('Updating media in JWPlayer...');
	for (const { media, contentId } of mapping) {
		const refreshedClip = refreshedClips.find((clip) => clip.contentId === contentId);
		if (!refreshedClip) {
			console.warn(`No refreshed data available for JW media ${media.id}`);
			continue;
		}

		try {
			const patchResponse = await fetch(`${jwpApiUrl}/media/${media.id}`, {
				method: 'PATCH',
				headers: jwpRequestHeaders,
				body: JSON.stringify({
					metadata: {
						custom_params: {
							...media.metadata.custom_params,
							'fandom:thumbnail': refreshedClip.thumbnailUrl,
						},
					},
				}),
			});
			if (!patchResponse.ok) {
				console.error(`Error updating media ${media.id}: ${patchResponse.statusText}`);
				continue;
			} else {
				console.log(`JW media ${media.id} - thumbnail updated successfully`);
			}
		} catch (error) {
			console.error(`Error updating media ${media.id}: ${error.message}`);
			continue;
		}

		try {
			const reuploadResponse = await fetch(`${jwpApiUrl}/media/${media.id}/reupload`, {
				method: 'PUT',
				headers: jwpRequestHeaders,
				body: JSON.stringify({
					upload: {
						method: 'external',
						mime_type: 'video/mp4',
						source_url: refreshedClip.videoUrl,
					},
				}),
			});
			if (!reuploadResponse.ok) {
				console.error(`Error reuploading media ${media.id}: ${reuploadResponse.statusText}`);
			} else {
				console.log(`JW media ${media.id} - reupload completed successfully`);
			}
		} catch (error) {
			console.error(`Error reuploading media ${media.id}: ${error.message}`);
		}

		await delay(1000);
	}
	console.groupEnd();
}

fetchDynamicPlaylists()
	.then(collectTagsToInclude)
	.then(fetchMediaByTags)
	.then(refreshMediaContent)
	.then(updateMediaInJWPlayer)
	.catch((error) => console.error(error));
