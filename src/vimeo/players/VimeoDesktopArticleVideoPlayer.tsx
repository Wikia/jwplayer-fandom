import React, { useRef, useState } from 'react';
import { VimeoArticleVideoPlayerProps } from 'vimeo/types';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'vimeo/players/shared/PlayerWrapper';
import CloseButton from 'vimeo/players/shared/CloseButton';
import VimeoPlayerWrapper from 'vimeo/players/shared/VimeoPlayerWrapper';

import clsx from 'clsx';

import styles from './VimeoDesktopArticleVideoPlayer.module.css';

interface VimeoDesktopArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	right?: number;
	width?: number;
}

const DesktopArticleVideoWrapper: React.FC<VimeoDesktopArticleVideoWrapperProps> = ({
	isScrollPlayer,
	right,
	width,
}) => {
	return (
		<>
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
			/>
		</>
	);
};

const TopBar: React.FC = () => <div className={styles.topBar} />;

const VimeoDesktopArticleVideoPlayer: React.FC<VimeoArticleVideoPlayerProps> = ({ vimeoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(placeholderRef, '0px', 0.1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;

	return (
		<PlayerWrapper playerName="vimeo-desktop-article-video">
			<div className={styles.vimeoDesktopArticleVideoTopPlaceholder} ref={placeholderRef}>
				<DesktopArticleVideoWrapper right={right} width={width} isScrollPlayer={isScrollPlayer}>
					<TopBar>{isScrollPlayer && <CloseButton deviceType={'desktop'} dismiss={() => setDismissed(true)} />}</TopBar>
					<VimeoPlayerWrapper deviceType="desktop" vimeoDetails={vimeoDetails} />
				</DesktopArticleVideoWrapper>
			</div>
		</PlayerWrapper>
	);
};

export default VimeoDesktopArticleVideoPlayer;
