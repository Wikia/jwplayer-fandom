import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
	trackYoutubePlayerInit,
	trackYoutubePlayerReady,
	trackYoutubePlayerReadyError,
	YoutubePlayerTrackingProps,
} from 'youtube/players/shared/youtubeTrackingEvents';
import { YoutubeTakeOverDetails } from 'loaders/utils/GetYoutubeTakeoverDetails';

const YoutubePlayerTarget = styled.div`
	iframe {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
	}
`;

const YoutubePlayerTargetWrapper = styled.div`
	padding-top: 56.25%;
	position: relative;
	height: 0;
`;

export interface YoutubeVideoDetails extends YoutubePlayerTrackingProps {
	youtubeTakeoverDetails?: YoutubeTakeOverDetails;
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
				onStateChange: () => console.log('Some player state change occurred'),
			},
			videoId: youtubeTakeoverDetails.youtubeVideoId,
			playerVars: {
				autoplay: 1,
				mute: 1,
				playsinline: 1,
				autohide: 1,
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
		<YoutubePlayerTargetWrapper>
			<YoutubePlayerTarget>
				<div id={youtubeTargetId} />
			</YoutubePlayerTarget>
		</YoutubePlayerTargetWrapper>
	);
};

export default React.memo(YoutubePlayerWrapper);
