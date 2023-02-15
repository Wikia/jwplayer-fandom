import React from 'react';
import { MobileReskinnedArticleVideoPlayerOverlayProps } from 'experimental/types';
import ContentPlayerOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ContentPlayerOverlay';
import PrerollPlayerOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerOverlay';
import useAdStarted from 'jwplayer/utils/useAdStarted';

const MobileReskinnedArticleVideoPlayerOverlay: React.FC<MobileReskinnedArticleVideoPlayerOverlayProps> = ({
	isScrollPlayer,
	showOverlay,
	resetOverlayTimeout,
}) => {
	const adStarted = useAdStarted();

	if (adStarted) {
		return <PrerollPlayerOverlay isScrollPlayer={isScrollPlayer} />;
	} else {
		return (
			<ContentPlayerOverlay
				isScrollPlayer={isScrollPlayer}
				showOverlay={showOverlay}
				resetOverlayTimeout={resetOverlayTimeout}
			/>
		);
	}
};

export default MobileReskinnedArticleVideoPlayerOverlay;
