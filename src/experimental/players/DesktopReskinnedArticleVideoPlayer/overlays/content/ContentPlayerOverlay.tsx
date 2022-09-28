import React from 'react';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { ContentPlayerOverlayProps } from 'experimental/types';
import ContentPlayerFullOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerFullOverlay';
import ContentPlayerScrollOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerScrollOverlay';

const ContentPlayerOverlay: React.FC<ContentPlayerOverlayProps> = ({ isScrollPlayer }) => {
	return (
		<PlayerOverlay>{isScrollPlayer ? <ContentPlayerScrollOverlay /> : <ContentPlayerFullOverlay />}</PlayerOverlay>
	);
};

export default ContentPlayerOverlay;
