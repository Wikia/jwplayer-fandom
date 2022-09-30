import React, { useEffect, useContext } from 'react';
import { JWPlayerApi, PlaylistItem, OnPlaylistItemEventData, SponsoredVideo } from 'jwplayer/types';
import FandomWirewaxPlugin from 'jwplayer/plugins/fandom-wirewax.plugin';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { JwPlayerWrapperProps } from 'jwplayer/types';
import { jwPlayerPlaybackTracker, triggerVideoMetric } from 'jwplayer/utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import addBaseTrackingEvents from 'jwplayer/players/shared/addBaseTrackingEvents';
import slugify from 'jwplayer/utils/slugify';
import getSponsoredVideos from 'utils/getSponsoredVideos';
interface WindowJWPlayer extends Window {
	jwplayer?: JWPlayerApi;
	sponsoredVideo?: SponsoredVideo;
}

declare let window: WindowJWPlayer;

/**
 * gets the android player if user is on an android device browser
 */
const getDefaultPlayerUrl = () => {
	return navigator.userAgent.match(/android/i)
		? 'https://cdn.jwplayer.com/libraries/MFqndUHM.js'
		: 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
};

const JwPlayerWrapper: React.FC<JwPlayerWrapperProps> = ({ config, playerUrl, onReady, onComplete }) => {
	const { setPlayer, setConfig } = useContext(PlayerContext);
	const defaultConfig = {
		plugins: { fandomWirewax: {} },
	};
	let sponsoredVideos: string[] = [];
	useEffect(() => {
		const retrieveSponsoredVideo = async () => {
			const sponsoredVideoResponse = await getSponsoredVideos();
			if (sponsoredVideoResponse) {
				sponsoredVideos = sponsoredVideoResponse;
				console.debug('SponsoredVideo list: ', sponsoredVideos);
			}
		};
		retrieveSponsoredVideo().catch((e) => {
			console.error('There was an issue with retrieving Sponsored Videos. ', e);
		});
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_INIT_RENDER);
		initPlayer('featured-video__player', playerUrl);
	}, []);

	const initPlayer = (elementId: string, playerUrl?: string) => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START);
		jwPlayerPlaybackTracker({ event_name: 'video_player_start_load' });

		const onload = () => {
			jwPlayerPlaybackTracker({ event_name: 'video_player_load' });
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY);
			triggerVideoMetric('loaded');
			const registerPlugin = window.jwplayer().registerPlugin;
			registerPlugin('wirewax', '8.0', FandomWirewaxPlugin);

			setConfig(config);

			const playerInstance = window.jwplayer(elementId).setup({
				...defaultConfig,
				...config,
			});

			playerInstance.on(JWEvents.READY, (event) => {
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_READY);
				triggerVideoMetric('ready');
				// only add the events after the player is ready
				jwPlayerPlaybackTracker({ event_name: 'video_player_ready' });
				addBaseTrackingEvents(playerInstance);
				new FandomWirewaxPlugin(elementId, {
					player: window.jwplayer(elementId),
					ready: event,
				});

				if (onReady) {
					onReady(playerInstance);
				}
			});

			playerInstance.on(JWEvents.COMPLETE, () => {
				if (typeof onComplete === 'function') {
					onComplete();
				}
			});

			playerInstance.on(JWEvents.PLAYLIST_ITEM, (event: OnPlaylistItemEventData) => {
				const nextMediaId = event?.item?.mediaid;
				const isSponsoredVideo = sponsoredVideos.includes(nextMediaId);
				console.debug('SponsoredVideo List: ', sponsoredVideos);
				console.debug(
					`Is Sponsored Video || next mediaId: ${event?.item?.mediaid} || sponsored video list: ${sponsoredVideos} || isSponsoredVideo: ${isSponsoredVideo}`,
				);
				if (window?.sponsoredVideo) {
					window.sponsoredVideo.isSponsored = isSponsoredVideo;
					window.sponsoredVideo.mediaId = nextMediaId;
				} else {
					window.sponsoredVideo = {
						isSponsored: isSponsoredVideo,
						mediaId: nextMediaId,
					};
				}
				if (event.index >= 4) {
					playerInstance.pause();
				}
			});

			playerInstance.setPlaylistItemCallback((item: PlaylistItem) => {
				item.link = `https://www.fandom.com/newvideopage/${item.mediaid}/${slugify(item.title)}`;
				return;
			});

			setPlayer(playerInstance);
		};

		if (typeof window.jwplayer === 'function') {
			onload();
		} else {
			const script = document.createElement('script');
			script.async = true;
			script.src = playerUrl || getDefaultPlayerUrl();
			script.onload = onload;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};

	return (
		<div>
			<div id="featured-video__player" />
		</div>
	);
};

export default React.memo(JwPlayerWrapper);
