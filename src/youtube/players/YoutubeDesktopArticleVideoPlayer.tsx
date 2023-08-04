import React, { useRef, useState } from 'react';
import YoutubePlayerWrapper from 'youtube/players/shared/YoutubePlayerWrapper';
import PlayerWrapper from 'youtube/players/shared/PlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import CloseButton from 'youtube/players/shared/CloseButton';
import { YoutubeArticleVideoPlayerProps, YoutubeTakeOverDetails } from 'youtube/types';

import clsx from 'clsx';

import styles from './youtubeDesktopArticleVideoPlayer.module.scss';

interface YoutubeDesktopArticleVideoWrapperProps {
	youtubeTakeoverDetails: YoutubeTakeOverDetails;
}

const DesktopArticleVideoWrapper: React.FC<YoutubeDesktopArticleVideoWrapperProps> = ({ youtubeTakeoverDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(placeholderRef, '0px', 0.1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;

	return (
		<div className={styles.youtubeDesktopArticleVideoTopPlaceholder} ref={placeholderRef}>
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
				<YoutubePlayerWrapper deviceType={'desktop'} youtubeTakeoverDetails={youtubeTakeoverDetails} />
			</div>
		</div>
	);
};

const YoutubeDesktopArticleVideoPlayer: React.FC<YoutubeArticleVideoPlayerProps> = ({ youtubeTakeoverDetails }) => {
	return (
		<PlayerWrapper playerName="youtube-desktop-article-video">
			<DesktopArticleVideoWrapper youtubeTakeoverDetails={youtubeTakeoverDetails} />
		</PlayerWrapper>
	);
};

export default YoutubeDesktopArticleVideoPlayer;
