import React, { useEffect } from 'react';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { PrerollPlayerOverlayProps } from 'experimental/types';
import PrerollPlayerFullOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerFullOverlay';
import PrerollPlayerScrollOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerScrollOverlay';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';
import useAdPlaying from 'jwplayer/utils/useAdPlaying';

const PrerollPlayerOverlay: React.FC<PrerollPlayerOverlayProps> = ({ isScrollPlayer, showOverlay }) => {
	const adPlaying = useAdPlaying();

	useEffect(() => {
		document.querySelector<HTMLElement>('#featured-video__player_ad iframe').style.position = null;
	}, []);

	return (
		<PlayerOverlay showOverlay={showOverlay || !adPlaying}>
			{isScrollPlayer ? <PrerollPlayerScrollOverlay /> : <PrerollPlayerFullOverlay />}
			<OverlayTimeSliderBottom progressColor={'#FFC500'} canSeek={false} />
		</PlayerOverlay>
	);
};

export default PrerollPlayerOverlay;
