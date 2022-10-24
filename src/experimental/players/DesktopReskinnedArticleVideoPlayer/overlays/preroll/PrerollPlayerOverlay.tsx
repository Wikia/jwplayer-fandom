import React from 'react';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { PrerollPlayerOverlayProps } from 'experimental/types';
import PrerollPlayerFullOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerFullOverlay';
import PrerollPlayerScrollOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerScrollOverlay';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';

const PrerollPlayerOverlay: React.FC<PrerollPlayerOverlayProps> = ({ isScrollPlayer, showOverlay }) => {
	return (
		<PlayerOverlay showOverlay={showOverlay}>
			{isScrollPlayer ? <PrerollPlayerScrollOverlay /> : <PrerollPlayerFullOverlay />}
			<OverlayTimeSliderBottom progressColor={'#FFC500'} />
		</PlayerOverlay>
	);
};

export default PrerollPlayerOverlay;
