import React, { useContext } from 'react';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { ContentPlayerOverlayProps } from 'experimental/types';
import ContentPlayerFullOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerFullOverlay';
import ContentPlayerScrollOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerScrollOverlay';
import usePlaying from 'jwplayer/utils/usePlaying';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import useRelatedOpen from 'jwplayer/utils/useRelatedOpen';

import styles from './ContentPlayerOverlay.module.css';

const ContentPlayerOverlay: React.FC<ContentPlayerOverlayProps> = ({ isScrollPlayer, showOverlay }) => {
	const { player } = useContext(PlayerContext);
	const isPlaying = usePlaying();
	const isRelatedOpen = useRelatedOpen();

	return (
		<PlayerOverlay
			className={showOverlay ? styles.playerOverlayAllowClick : ''}
			showOverlay={(showOverlay && !isRelatedOpen) || !isPlaying}
			handleOverlayClick={isPlaying ? player?.pause : player?.play}
		>
			{isScrollPlayer ? <ContentPlayerScrollOverlay /> : <ContentPlayerFullOverlay />}
		</PlayerOverlay>
	);
};

export default ContentPlayerOverlay;
