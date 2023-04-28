import React, { useRef, useState } from 'react';
import YoutubePlayerWrapper from 'youtube/players/shared/YoutubePlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'youtube/players/shared/PlayerWrapper';

import clsx from 'clsx';

import { YoutubeArticleVideoPlayerProps } from '../types';

import styles from './youtubeMobileArticleVideoPlayer.module.scss';

import MobileYoutubeOffScreenOverlay from './overlays/MobileYoutubeOffScreenOverlay';

interface MobileArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	topPosition: string;
}

const MobileArticleVideoWrapper: React.FC<MobileArticleVideoWrapperProps> = ({ isScrollPlayer, topPosition }) => (
	<div
		className={clsx(
			isScrollPlayer
				? styles.mobileArticleVideoWrapperIsScrollPlayer
				: styles.mobileArticleVideoWrapperIsNotScrollPlayer,
		)}
		style={{
			...(isScrollPlayer && { top: topPosition }),
		}}
	/>
);

interface MobileArticleVideoPlayerProps extends YoutubeArticleVideoPlayerProps {
	hasPartnerSlot?: boolean;
	isFullScreen?: boolean;
}

const YoutubeMobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({
	hasPartnerSlot,
	isFullScreen,
	youtubeTakeoverDetails,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref, '0px', 1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);

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
			<div className={styles.mobileArticleVideoTopPlaceholder} ref={ref}>
				<MobileArticleVideoWrapper isScrollPlayer={isScrollPlayer} topPosition={getTopPosition()}>
					<MobileYoutubeOffScreenOverlay dismiss={() => setDismissed(true)} isScrollPlayer={isScrollPlayer} />
					<YoutubePlayerWrapper deviceType={'mobile'} youtubeTakeoverDetails={youtubeTakeoverDetails} />
				</MobileArticleVideoWrapper>
			</div>
		</PlayerWrapper>
	);
};

export default YoutubeMobileArticleVideoPlayer;
