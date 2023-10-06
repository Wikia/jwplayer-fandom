import React, { useEffect } from 'react';

import { VimeoArticleVideoPlayerTrackingProps } from 'vimeo/types';

import { TakeoverDetails } from 'loaders/types';

import styles from './VimeoPlayerWrapper.module.css';

export interface VimeoVideoDetails extends VimeoArticleVideoPlayerTrackingProps {
	vimeoDetails?: TakeoverDetails;
}

interface WindowWithVimeo extends Window {
	Vimeo: {
		Player: (htmlElementId: string) => void;
	};
}

interface VimeoLoadedData {
	id: number;
}

declare let window: WindowWithVimeo;

const vimeoTargetId = 'vimeo-embed-target';

const VimeoPlayerWrapper: React.FC<VimeoVideoDetails> = ({ deviceType, vimeoDetails }) => {
	const initVimeoPlayer = () => {
		const player = new window.Vimeo.Player(vimeoTargetId);
		console.debug(`Vimeo API object initiated - ${!!player}`);

		player.on('loaded', ({ id }: VimeoLoadedData) => {
			console.debug(`Vimeo video ID: ${id} loaded`);
			player.setVolume(0).then(() => {
				player.play();
			});
		});
	};

	useEffect(() => {
		initPlayer();
	}, []);

	const initPlayer = () => {
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
			initVimeoPlayer();
		}
	};

	const initialWidth = deviceType === 'desktop' ? 640 : 320;

	return (
		<div className={styles.vimeoPlayerTargetWrapper}>
			<div className={styles.vimeoPlayerTarget}>
				<div id={vimeoTargetId} data-vimeo-id={vimeoDetails.videoId} data-vimeo-width={initialWidth}></div>
			</div>
		</div>
	);
};

export default React.memo(VimeoPlayerWrapper);
