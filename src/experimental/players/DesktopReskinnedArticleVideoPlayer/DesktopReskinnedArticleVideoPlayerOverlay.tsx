import React from 'react';
import { DesktopReskinnedArticleVideoPlayerOverlayProps } from 'jwplayer/types';
// import useAdBreak from 'jwplayer/utils/useAdBreak';
import ContentPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerOverlay';
import PrerollPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerOverlay';
import useAdPlaying from 'jwplayer/utils/useAdPlaying';

const DesktopReskinnedArticleVideoPlayerOverlay: React.FC<DesktopReskinnedArticleVideoPlayerOverlayProps> = ({
	isScrollPlayer,
	setDismissed,
}) => {
	// const adBreak = useAdBreak();
	const adPlaying = useAdPlaying();

	if (adPlaying) {
		return <PrerollPlayerOverlay isScrollPlayer={isScrollPlayer} setDismissed={setDismissed} />;
	} else {
		return <ContentPlayerOverlay isScrollPlayer={isScrollPlayer} setDismissed={setDismissed} />;
	}
};

export default DesktopReskinnedArticleVideoPlayerOverlay;
