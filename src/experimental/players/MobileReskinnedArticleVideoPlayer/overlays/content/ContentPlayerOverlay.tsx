import React from 'react';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { MobileContentPlayerOverlayProps } from 'experimental/types';
import ContentPlayerFullOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ContentPlayerFullOverlay';
import ContentPlayerScrollOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ContentPlayerScrollOverlay';
import usePlaying from 'jwplayer/utils/usePlaying';
import useRelatedOpen from 'jwplayer/utils/useRelatedOpen';

import styles from './ContentPlayerOverlay.module.css';

const ContentPlayerOverlay: React.FC<MobileContentPlayerOverlayProps> = ({
	isScrollPlayer,
	showOverlay,
	resetOverlayTimeout,
}) => {
	const isPlaying = usePlaying();
	const isRelatedOpen = useRelatedOpen();
	const allowPointerEvents = (showOverlay && !isRelatedOpen) || !isPlaying;

	return (
		<PlayerOverlay
			className={`${styles.playerOverlay} ${() => (allowPointerEvents ? styles.playerOverlayAllowClick : '')}`}
		>
			{isScrollPlayer ? (
				<ContentPlayerScrollOverlay resetOverlayTimeout={resetOverlayTimeout} />
			) : (
				<ContentPlayerFullOverlay resetOverlayTimeout={resetOverlayTimeout} />
			)}
		</PlayerOverlay>
	);
};

export default ContentPlayerOverlay;
