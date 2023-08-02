import React, { useRef, useState } from 'react';
import YoutubePlayerWrapper from 'youtube/players/shared/YoutubePlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'youtube/players/shared/PlayerWrapper';

import clsx from 'clsx';

import { YoutubeArticleVideoPlayerProps } from '../types';

import styles from './youtubeMobileArticleVideoPlayer.module.scss';

import MobileYoutubeOffScreenOverlay from './overlays/MobileYoutubeOffScreenOverlay';

interface MobileArticleVideoWrapperProps {
	youtubeTakeoverDetails: any;
	topPosition: string;
}

const MobileArticleVideoWrapper: React.FC<MobileArticleVideoWrapperProps> = ({
	youtubeTakeoverDetails,
	topPosition,
}) => {
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
					...(isScrollPlayer && { top: topPosition }),
				}}
			>
				<MobileYoutubeOffScreenOverlay dismiss={() => setDismissed(true)} isScrollPlayer={isScrollPlayer} />
				<YoutubePlayerWrapper deviceType={'mobile'} youtubeTakeoverDetails={youtubeTakeoverDetails} />
			</div>
		</div>
	);
};

interface MobileArticleVideoPlayerProps extends YoutubeArticleVideoPlayerProps {
	hasPartnerSlot?: boolean;
	isFullScreen?: boolean;
}

const YoutubeMobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({
	hasPartnerSlot,
	isFullScreen,
	youtubeTakeoverDetails,
}) => {
	const getTopPosition = () => {
		if (isFullScreen) {
			return '0px';
		}

		if (hasPartnerSlot) {
			return '75px';
		}

		return '55px';
	};

	return (
		<PlayerWrapper playerName="youtube-mobile-article-video">
			<MobileArticleVideoWrapper youtubeTakeoverDetails={youtubeTakeoverDetails} topPosition={getTopPosition()} />
		</PlayerWrapper>
	);
};

export default YoutubeMobileArticleVideoPlayer;
