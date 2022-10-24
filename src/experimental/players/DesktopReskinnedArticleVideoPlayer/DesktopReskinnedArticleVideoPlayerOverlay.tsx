import React from 'react';
import { DesktopReskinnedArticleVideoPlayerOverlayProps } from 'experimental/types';
import ContentPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerOverlay';
import PrerollPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerOverlay';
import useAdStarted from 'jwplayer/utils/useAdStarted';

const DesktopReskinnedArticleVideoPlayerOverlay: React.FC<DesktopReskinnedArticleVideoPlayerOverlayProps> = ({
	isScrollPlayer,
	showOverlay,
}) => {
	const adStarted = useAdStarted();

	if (adStarted) {
		return <PrerollPlayerOverlay isScrollPlayer={isScrollPlayer} showOverlay={showOverlay} />;
	} else {
		return <ContentPlayerOverlay isScrollPlayer={isScrollPlayer} showOverlay={showOverlay} />;
	}
};

export default DesktopReskinnedArticleVideoPlayerOverlay;
