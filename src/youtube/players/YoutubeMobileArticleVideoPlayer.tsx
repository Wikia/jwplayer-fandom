import React, { useRef, useState } from 'react';
import YoutubePlayerWrapper from 'youtube/players/shared/YoutubePlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'youtube/players/shared/PlayerWrapper';
import { useMobileArticleVideoContext } from 'contexts/MobileArticleVideoContext';
import clsx from 'clsx';

import { TakeoverDetails } from 'loaders/types';

import { YoutubeArticleVideoPlayerProps } from '../types';

import styles from './youtubeMobileArticleVideoPlayer.module.scss';
import MobileYoutubeOffScreenOverlay from './overlays/MobileYoutubeOffScreenOverlay';

interface MobileArticleVideoWrapperProps {
	youtubeTakeoverDetails: TakeoverDetails;
}

const MobileArticleVideoWrapper: React.FC<MobileArticleVideoWrapperProps> = ({ youtubeTakeoverDetails }) => {
	const { scrollTopPosition } = useMobileArticleVideoContext();
	const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref, '0px', 1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);

	return (
		<div className={styles.mobileArticleVideoTopPlaceholder} ref={ref}>
			<div
				className={clsx(
					isScrollPlayer
						? styles.mobileArticleVideoWrapperIsScrollPlayer
						: styles.mobileArticleVideoWrapperIsNotScrollPlayer,
				)}
				style={{
					...(isScrollPlayer && { top: scrollTopPosition }),
				}}
			>
				<MobileYoutubeOffScreenOverlay dismiss={() => setDismissed(true)} isScrollPlayer={isScrollPlayer} />
				<YoutubePlayerWrapper deviceType={'mobile'} youtubeTakeoverDetails={youtubeTakeoverDetails} />
			</div>
		</div>
	);
};

const YoutubeMobileArticleVideoPlayer: React.FC<YoutubeArticleVideoPlayerProps> = ({ youtubeTakeoverDetails }) => {
	return (
		<PlayerWrapper playerName="youtube-mobile-article-video">
			<MobileArticleVideoWrapper youtubeTakeoverDetails={youtubeTakeoverDetails} />
		</PlayerWrapper>
	);
};

export default YoutubeMobileArticleVideoPlayer;
