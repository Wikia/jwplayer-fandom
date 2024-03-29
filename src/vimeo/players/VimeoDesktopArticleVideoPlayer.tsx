import React, { useRef, useState } from 'react';
import { VimeoArticleVideoPlayerProps } from 'vimeo/types';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'vimeo/players/shared/PlayerWrapper';
import CloseButton from 'vimeo/players/shared/CloseButton';
import VimeoPlayerWrapper from 'vimeo/players/shared/VimeoPlayerWrapper';

import clsx from 'clsx';

import { TakeoverDetails } from 'loaders/types';

import styles from './VimeoDesktopArticleVideoPlayer.module.css';

interface VimeoDesktopArticleVideoWrapperProps {
	vimeoDetails: TakeoverDetails;
}

const DesktopArticleVideoWrapper: React.FC<VimeoDesktopArticleVideoWrapperProps> = ({ vimeoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const [dismissed, setDismissed] = useState(false);
	const onScreen = useOnScreen(placeholderRef, '0px', 0.1);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;

	return (
		<div className={styles.vimeoDesktopArticleVideoTopPlaceholder} ref={placeholderRef}>
			<style>
				{`
					@keyframes moveDownAnimation {
						from {
							right: ${right}px;
							bottom: 100%;
							width: ${width}px;
						}

						to {
							right: 18px;
							bottom: 45px;
							width: 300px;
						}
					}
				`}
			</style>
			<div
				className={clsx(
					isScrollPlayer
						? styles.desktopArticleVideoWrapperIsScrollPlayer
						: styles.desktopArticleVideoWrapperIsNotScrollPlayer,
				)}
			>
				<div className={styles.topBar}>
					{isScrollPlayer && <CloseButton deviceType={'desktop'} dismiss={() => setDismissed(true)} />}
				</div>
				<VimeoPlayerWrapper deviceType="desktop" vimeoDetails={vimeoDetails} />
			</div>
		</div>
	);
};

export const VimeoDesktopArticleVideoPlayer: React.FC<VimeoArticleVideoPlayerProps> = ({ vimeoDetails }) => {
	return (
		<PlayerWrapper playerName="vimeo-desktop-article-video">
			<DesktopArticleVideoWrapper vimeoDetails={vimeoDetails} />
		</PlayerWrapper>
	);
};

export default VimeoDesktopArticleVideoPlayer;
