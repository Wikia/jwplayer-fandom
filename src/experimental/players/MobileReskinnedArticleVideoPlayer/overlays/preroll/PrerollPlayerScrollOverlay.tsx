import React from 'react';
import { MobileReskinnedArticleVideoPlayerPrerollScrollOverlayProps } from 'experimental/types';

const MobileReskinnedArticleVideoPlayerPrerollScrollOverlay: React.FC<
	MobileReskinnedArticleVideoPlayerPrerollScrollOverlayProps
> = ({ showOverlay }) => {
	console.log('================ PREROLL SCROLL OVERLAY ================');

	return <div>{showOverlay}</div>;
};

export default MobileReskinnedArticleVideoPlayerPrerollScrollOverlay;
