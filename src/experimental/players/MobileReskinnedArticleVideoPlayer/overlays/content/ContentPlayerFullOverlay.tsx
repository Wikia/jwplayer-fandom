import React from 'react';
import { MobileReskinnedArticleVideoPlayerContentFullOverlayProps } from 'experimental/types';

const MobileReskinnedArticleVideoPlayerContentFullOverlay: React.FC<
	MobileReskinnedArticleVideoPlayerContentFullOverlayProps
> = ({ showOverlay }) => {
	console.log('================ CONTENT FULL OVERLAY ================');
	return <div>{showOverlay}</div>;
};

export default MobileReskinnedArticleVideoPlayerContentFullOverlay;
