import React, { useEffect } from 'react';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { PrerollPlayerOverlayProps } from 'experimental/types';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';
import PrerollPlayerFullOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerFullOverlay';

const PrerollPlayerOverlay: React.FC<PrerollPlayerOverlayProps> = ({ isScrollPlayer }) => {
	useEffect(() => {
		document.querySelector<HTMLElement>('#featured-video__player_ad iframe').style.position = null;
	}, []);

	if (isScrollPlayer) return <OverlayTimeSliderBottom progressColor={'#FFC500'} canSeek={false} />;

	return (
		<PlayerOverlay showOverlay={true}>
			<PrerollPlayerFullOverlay />
			<OverlayTimeSliderBottom progressColor={'#FFC500'} canSeek={false} />
		</PlayerOverlay>
	);
};

export default PrerollPlayerOverlay;
