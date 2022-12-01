import React from 'react';
import { MobileReskinnedArticleVideoPlayerContentScrollOverlayProps } from 'experimental/types';

const MobileReskinnedArticleVideoPlayerContentScrollOverlay: React.FC<
	MobileReskinnedArticleVideoPlayerContentScrollOverlayProps
> = ({ showOverlay }) => {
	console.log('================ CONTENT SCROLL OVERLAY ================');

	return <div>{showOverlay}</div>;
};

export default MobileReskinnedArticleVideoPlayerContentScrollOverlay;
