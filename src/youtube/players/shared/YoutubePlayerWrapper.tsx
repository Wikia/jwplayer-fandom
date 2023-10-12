import React, { useEffect } from 'react';
import {
	trackYoutubePlayerInit,
	trackYoutubePlayerReady,
	trackYoutubePlayerReadyError,
	trackYoutubePlayerStateChange,
	YoutubePlayerTrackingProps,
} from 'youtube/players/shared/youtubeTrackingEvents';
import { TakeoverDetails } from 'loaders/types';

import styles from './YoutubePlayerWrapper.module.css';

import OnStateChangeEvent = YT.OnStateChangeEvent;

export interface YoutubeVideoDetails extends YoutubePlayerTrackingProps {
	youtubeTakeoverDetails?: TakeoverDetails;
}

interface WindowWithYouTube extends Window {
	onYouTubeIframeAPIReady: () => void;
	YT: unknown;
}

declare let window: WindowWithYouTube;

const youtubeTargetId = 'youtube-embed-target';

const YoutubePlayerWrapper: React.FC<YoutubeVideoDetails> = ({ deviceType, youtubeTakeoverDetails }) => {
	// const [setYoutubePlayer] = useState<YT.Player>(null);

	const loadYoutubeVideo = () => {
		const player = new YT.Player(youtubeTargetId, {
			events: {
				onReady: onYoutubeReady,
				onStateChange: (event: OnStateChangeEvent) => {
					const playerStateEnum = YT.PlayerState;
					const stateValueAsString = Object.keys(playerStateEnum).find((key) => playerStateEnum?.[key] === event.data);
					trackYoutubePlayerStateChange({ deviceType, playerStateName: stateValueAsString });
				},
			},
			videoId: youtubeTakeoverDetails.videoId,
			playerVars: {
				autoplay: 1,
				mute: 1,
				playsinline: 1,
				autohide: 1,
				rel: 0,
			},
		});
		console.debug(`Youtube API object initiated - ${!!player}`);
	};

	useEffect(() => {
		initPlayer();
		trackYoutubePlayerInit({ deviceType });
	}, []);

	const onYoutubeReady = (event) => {
		console.debug('Youtube Player Embed Ready.');
		if (typeof event?.target?.playVideo === 'function') {
			console.debug('Youtube Player Embed Ready - YoutubePlayer was set.');
			trackYoutubePlayerReady({ deviceType });
			event.target.playVideo();
		} else {
			console.error('Error on Youtube ready. The Youtube Player API was not set.');
			trackYoutubePlayerReadyError({ deviceType });
		}
	};

	const initPlayer = () => {
		// If the Youtube iFrame API script are not present, then load them in the header
		if (!window?.YT) {
			const script = document.createElement('script');
			script.src = 'https://www.youtube.com/iframe_api';

			window.onYouTubeIframeAPIReady = loadYoutubeVideo;

			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
			document.getElementsByTagName('head')[0].appendChild(script);
		} else {
			// If the Youtube script was loaded already for some reason, then just initialize the Youtube iFrame
			loadYoutubeVideo();
		}
	};

	return (
		<div className={styles.youtubePlayerTargetWrapper}>
			<div className={styles.youtubePlayerTarget}>
				<div id={youtubeTargetId} />
			</div>
		</div>
	);
};

export default React.memo(YoutubePlayerWrapper);
