import React from 'react';
import { MobileReskinnedArticleVideoPlayerPrerollOverlayProps } from 'experimental/types';
import PrerollPlayerScrollOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerScrollOverlay';
import PrerollPlayerFullOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerFullOverlay';

const MobileReskinnedArticleVideoPlayerPrerollOverlay: React.FC<
	MobileReskinnedArticleVideoPlayerPrerollOverlayProps
> = ({ isScrollPlayer, showOverlay }) => {
	if (isScrollPlayer) {
		return <PrerollPlayerScrollOverlay showOverlay={showOverlay} />;
	} else {
		return <PrerollPlayerFullOverlay showOverlay={showOverlay} />;
	}
};

export default MobileReskinnedArticleVideoPlayerPrerollOverlay;
