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

async function fetchDynamicPlaylists() {
	try {
		const query = new URLSearchParams({
			page: 1,
			page_length: 100,
			q: 'playlist_type:dynamic',
		});
		console.group('Fetching playlists...');
		console.debug(query.toString());
		const response = await fetch(`${jwpApiUrl}/playlists?${query.toString()}`, { headers: jwpRequestHeaders });
		const data = await response.json();
		const { total, playlists } = data;
		console.log(`Found ${total} dynamic playlists`);
		return playlists.map((playlist) => playlist.id);
	} catch (err) {
		console.error(err);
		throw err;
	} finally {
		console.groupEnd();
	}
}

async function fetchDynamicPlaylist(playlistId) {
	try {
		const response = await fetch(`${jwpApiUrl}/playlists/${playlistId}/dynamic_playlist`, {
			headers: jwpRequestHeaders,
		});
		return await response.json();
	} catch (err) {
		console.error(err);
		throw err;
	}
}

async function collectTagsToInclude(playlistIds) {
	const tags = [];
	for (const playlistId of playlistIds) {
		try {
			const {
				metadata: { tag_filter: tagFilter },
			} = await fetchDynamicPlaylist(playlistId);
			if (tagFilter?.include?.values) {
				tags.push(...tagFilter.include.values);
			}
		} catch (error) {
			console.error(error);
		}
		await delay(1000);
	}
	return tags.filter((value, index, arr) => arr.indexOf(value) === index && value !== 'medal-approved');
}

async function fetchMediaByTags(tags) {
	try {
		const query = new URLSearchParams({
			page: 1,
			page_length: 1000,
			q: `tags:(${tags.join(' OR ')})`,
		});
		console.group('Fetching media...');
		console.debug(query.toString());
		const response = await fetch(`${jwpApiUrl}/media?${query.toString()}`, { headers: jwpRequestHeaders });
		const data = await response.json();
		const { total, media } = data;
		console.log(`Found ${total ?? 0} media`);
		return media;
	} catch (err) {
		console.error(err);
		throw err;
	} finally {
		console.groupEnd();
	}
}

async function refreshMediaContent(media) {
	const mediaMapping = media.map((video) => {
		const contentId = video.metadata.custom_params.import_guid.split('/').filter(Boolean).pop();
		return { media: video, contentId };
	});
	const contentIds = mediaMapping.map((item) => item.contentId);

	console.group('Refreshing media content on Medal...');
	try {
		const response = await fetch(`${medalApiUrl}/content/refresh`, {
			method: 'POST',
			headers: medalRequestHeaders,
			body: JSON.stringify({ contentIds }),
		});
		const refreshedClips = await response.json();
		console.log(`Received ${refreshedClips.length} refreshed clips`);
		return { mediaMapping, refreshedClips };
	} catch (err) {
		console.error(err);
		throw err;
	} finally {
		console.groupEnd();
	}
}

async function updateMediaInJWPlayer({ mediaMapping, refreshedClips }) {
	console.group('Updating media in JWPlayer...');
	for (const { media, contentId } of mediaMapping) {
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
							thumbnail: refreshedClip.thumbnailUrl,
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

async function main() {
	try {
		const playlists = await fetchDynamicPlaylists();
		const tags = await collectTagsToInclude(playlists);
		const media = await fetchMediaByTags(tags);
		const refreshed = await refreshMediaContent(media);
		await updateMediaInJWPlayer(refreshed);
	} catch (error) {
		console.error(error);
	}
}

void main();
