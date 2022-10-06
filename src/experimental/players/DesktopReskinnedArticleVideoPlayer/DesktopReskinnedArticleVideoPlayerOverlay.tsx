import React from 'react';
import { DesktopReskinnedArticleVideoPlayerOverlayProps } from 'jwplayer/types';
import ContentPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerOverlay';
import PrerollPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerOverlay';
import useAdStarted from 'jwplayer/utils/useAdStarted';

const DesktopReskinnedArticleVideoPlayerOverlay: React.FC<DesktopReskinnedArticleVideoPlayerOverlayProps> = ({
	isScrollPlayer,
	setDismissed,
}) => {
	const adStarted = useAdStarted();

	if (adStarted) {
		return <PrerollPlayerOverlay isScrollPlayer={isScrollPlayer} setDismissed={setDismissed} />;
	} else {
		return <ContentPlayerOverlay isScrollPlayer={isScrollPlayer} setDismissed={setDismissed} />;
	}
};

export default DesktopReskinnedArticleVideoPlayerOverlay;
