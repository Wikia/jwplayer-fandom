import React, { useContext } from 'react';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { ContentPlayerOverlayProps } from 'experimental/types';
import ContentPlayerFullOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerFullOverlay';
import ContentPlayerScrollOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerScrollOverlay';
import usePlaying from 'jwplayer/utils/usePlaying';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const ContentPlayerOverlay: React.FC<ContentPlayerOverlayProps> = ({ isScrollPlayer }) => {
	const { player } = useContext(PlayerContext);
	const isPlaying = usePlaying();

	return (
		<PlayerOverlay handleOverlayClick={isPlaying ? player?.pause : player?.play}>
			{isScrollPlayer ? <ContentPlayerScrollOverlay /> : <ContentPlayerFullOverlay />}
		</PlayerOverlay>
	);
};

export default ContentPlayerOverlay;
