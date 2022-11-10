import React, { useEffect } from 'react';
import styled from 'styled-components';
import { youtubeInit, YoutubePlayerTrackingProps } from 'youtube/players/shared/youtubeTrackingEvents';
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

const YoutubePlayerWrapper: React.FC<YoutubeVideoDetails> = ({ deviceType, youtubeTakeoverDetails }) => {
	useEffect(() => {
		// initPlayer('twitch-video__player');
		youtubeInit({ deviceType });
	}, []);

	/*	const initPlayer = (elementId: string) => {
		const onload = () => {
			console.log('onload');
			const player = new window.Twitch.Player(elementId, defaultOptions);
			setPlayer(player);
		};

		if (typeof window.Twitch === 'function') {
			onload();
		} else {
			const script = document.createElement('script');
			script.async = true;
			script.src = 'https://player.twitch.tv/js/embed/v1.js';
			script.onload = onload;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	}; */

	return (
		<YoutubePlayerTargetWrapper>
			<YoutubePlayerTarget>
				<iframe
					width="100%"
					height="100%"
					src={`https://www.youtube.com/embed/${youtubeTakeoverDetails.youtubeVideoId}`}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</YoutubePlayerTarget>
		</YoutubePlayerTargetWrapper>
	);
};

export default React.memo(YoutubePlayerWrapper);
