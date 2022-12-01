import React from 'react';
import { MobileReskinnedArticleVideoPlayerPrerollFullOverlayProps } from 'experimental/types';

const MobileReskinnedArticleVideoPlayerPrerollFullOverlay: React.FC<
	MobileReskinnedArticleVideoPlayerPrerollFullOverlayProps
> = ({ showOverlay }) => {
	console.log('================ PREROLL FULL OVERLAY ================');

	return <div>{showOverlay}</div>;
};

export default MobileReskinnedArticleVideoPlayerPrerollFullOverlay;
