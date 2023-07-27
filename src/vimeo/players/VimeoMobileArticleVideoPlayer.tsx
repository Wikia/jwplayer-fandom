import React, { useRef, useState } from 'react';
import VimeoPlayerWrapper from 'vimeo/players/shared/VimeoPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'vimeo/players/shared/PlayerWrapper';
import { VimeoArticleVideoPlayerProps } from 'vimeo/types';

import clsx from 'clsx';

import styles from './VimeoMobileArticleVideoPlayer.module.css';
import MobileVimeoOffScreenOverlay from './overlays/MobileVimeoOffScreenOverlay';

interface MobileArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	topPosition: string;
}

interface MobileArticleVideoPlayerProps extends VimeoArticleVideoPlayerProps {
	hasPartnerSlot?: boolean;
	isFullScreen?: boolean;
}

const MobileArticleVideoWrapper: React.FC<MobileArticleVideoWrapperProps> = ({
	isScrollPlayer,
	topPosition,
	children,
}) => (
	<div
		className={clsx(
			`mobile-article-video-wrapper`,
			isScrollPlayer
				? styles.mobileArticleVideoWrapperIsScrollPlayer
				: styles.mobileArticleVideoWrapperIsNotScrollPlayer,
		)}
		style={{
			...(isScrollPlayer && { top: topPosition }),
		}}
	>
		{children}
	</div>
);

const VimeoMobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({
	hasPartnerSlot,
	isFullScreen,
	vimeoDetails,
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
			<div ref={ref} className={clsx(styles.mobileArticleVideoTopPlaceholder, isScrollPlayer && `is-on-scroll-active`)}>
				<MobileArticleVideoWrapper isScrollPlayer={isScrollPlayer} topPosition={getTopPosition()}>
					<MobileVimeoOffScreenOverlay dismiss={() => setDismissed(true)} isScrollPlayer={isScrollPlayer} />
					<VimeoPlayerWrapper deviceType="mobile" vimeoDetails={vimeoDetails} />
				</MobileArticleVideoWrapper>
			</div>
		</PlayerWrapper>
	);
};

export default VimeoMobileArticleVideoPlayer;
