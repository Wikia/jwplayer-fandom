import React, { useEffect } from 'react';
import { VimeoArticleVideoPlayerTrackingProps, VimeoTakeOverDetails } from 'vimeo/types';
import styled from 'styled-components';

export interface VimeoVideoDetails extends VimeoArticleVideoPlayerTrackingProps {
	vimeoDetails?: VimeoTakeOverDetails;
}

interface WindowWithVimeo extends Window {
	Vimeo: {
		Player: (htmlElementId: string) => void;
	};
}

declare let window: WindowWithVimeo;

const vimeoTargetId = 'youtube-embed-target';

const VimeoPlayerTarget = styled.div`
	iframe {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
	}
`;

const VimeoPlayerTargetWrapper = styled.div`
	padding-top: 56.25%;
	position: relative;
	height: 0;
`;

const VimeoPlayerWrapper: React.FC<VimeoVideoDetails> = ({ deviceType, vimeoDetails }) => {
	const initVimeoPlayer = () => {
		const player = new window.Vimeo.Player(vimeoTargetId);
		console.debug(`Vimeo API object initiated - ${!!player}`);
	};

	useEffect(() => {
		initPlayer();
	}, []);

	const initPlayer = () => {
		// If the Youtube iFrame API script are not present, then load them in the header
		if (!window?.Vimeo) {
			const script = document.createElement('script');
			script.src = 'https://player.vimeo.com/api/player.js';
			script.onload = () => {
				console.debug('Vimeo script loaded.');
				initVimeoPlayer();
			};

			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
			document.getElementsByTagName('head')[0].appendChild(script);
		} else {
			// If the Vimeo script was loaded already for some reason, then just initialize the player
			initVimeoPlayer();
		}
	};

	const initialWidth = deviceType === 'desktop' ? 640 : 320;

	return (
		<VimeoPlayerTargetWrapper>
			<VimeoPlayerTarget>
				<div id={vimeoTargetId} data-vimeo-id={vimeoDetails.videoId} data-vimeo-width={initialWidth}></div>
			</VimeoPlayerTarget>
		</VimeoPlayerTargetWrapper>
	);
};

export default React.memo(VimeoPlayerWrapper);
