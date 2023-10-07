import React, { useRef, useState } from 'react';
import VimeoPlayerWrapper from 'vimeo/players/shared/VimeoPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import { VimeoArticleVideoPlayerProps, VimeoTakeOverDetails } from 'vimeo/types';
import { useMobileArticleVideoContext } from 'contexts/MobileArticleVideoContext';

import clsx from 'clsx';

import styles from './VimeoMobileArticleVideoPlayer.module.css';
import MobileVimeoOffScreenOverlay from './overlays/MobileVimeoOffScreenOverlay';

interface MobileArticleVideoWrapperProps {
	vimeoDetails: VimeoTakeOverDetails;
}

const MobileArticleVideoWrapper: React.FC<MobileArticleVideoWrapperProps> = ({ vimeoDetails, children }) => {
	const { scrollTopPosition } = useMobileArticleVideoContext();
	const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref, '0px', 1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);

	return (
		<div ref={ref} className={clsx(styles.mobileArticleVideoTopPlaceholder, isScrollPlayer && `is-on-scroll-active`)}>
			<div
				className={clsx(
					`mobile-article-video-wrapper`,
					isScrollPlayer
						? styles.mobileArticleVideoWrapperIsScrollPlayer
						: styles.mobileArticleVideoWrapperIsNotScrollPlayer,
				)}
				style={{
					...(isScrollPlayer && { top: scrollTopPosition }),
				}}
			>
				<MobileVimeoOffScreenOverlay dismiss={() => setDismissed(true)} isScrollPlayer={isScrollPlayer} />
				<VimeoPlayerWrapper deviceType="mobile" vimeoDetails={vimeoDetails} />
				{children}
			</div>
		</div>
	);
};

const VimeoMobileArticleVideoPlayer: React.FC<VimeoArticleVideoPlayerProps> = ({ vimeoDetails }) => {
	return <MobileArticleVideoWrapper vimeoDetails={vimeoDetails} />;
};

export default VimeoMobileArticleVideoPlayer;
