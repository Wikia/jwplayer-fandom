import React from 'react';
import { MobileReskinnedArticleVideoPlayerContentOverlayProps } from 'experimental/types';
import ContentPlayerScrollOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ContentPlayerScrollOverlay';
import ContentPlayerFullOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ContentPlayerFullOverlay';

const MobileReskinnedArticleVideoPlayerContentOverlay: React.FC<
	MobileReskinnedArticleVideoPlayerContentOverlayProps
> = ({ isScrollPlayer, showOverlay }) => {
	if (isScrollPlayer) {
		return <ContentPlayerScrollOverlay showOverlay={showOverlay} />;
	} else {
		return <ContentPlayerFullOverlay showOverlay={showOverlay} />;
	}
};

export default MobileReskinnedArticleVideoPlayerContentOverlay;
