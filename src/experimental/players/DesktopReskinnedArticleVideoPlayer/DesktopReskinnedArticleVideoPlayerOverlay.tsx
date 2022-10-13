import React from 'react';
import { DesktopReskinnedArticleVideoPlayerOverlayProps } from 'experimental/types';
import ContentPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerOverlay';
import PrerollPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerOverlay';
import useAdStarted from 'jwplayer/utils/useAdStarted';

const DesktopReskinnedArticleVideoPlayerOverlay: React.FC<DesktopReskinnedArticleVideoPlayerOverlayProps> = ({
	isScrollPlayer,
}) => {
	const adStarted = useAdStarted();

	if (adStarted) {
		return <PrerollPlayerOverlay isScrollPlayer={isScrollPlayer} />;
	} else {
		return <ContentPlayerOverlay isScrollPlayer={isScrollPlayer} />;
	}
};

export default DesktopReskinnedArticleVideoPlayerOverlay;
