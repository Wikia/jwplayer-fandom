import React, { useContext } from 'react';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { PrerollPlayerOverlayProps } from 'experimental/types';
import PrerollPlayerFullOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerFullOverlay';
import PrerollPlayerScrollOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerScrollOverlay';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';
import { useAdClick } from 'experimental/utils/useAdClick';
import useAdPlaying from 'jwplayer/utils/useAdPlaying';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const PrerollPlayerOverlay: React.FC<PrerollPlayerOverlayProps> = ({ isScrollPlayer }) => {
	const { player } = useContext(PlayerContext);
	const isPlaying = useAdPlaying();
	const togglePlay = isPlaying ? player?.pause : player?.play;
	const handleOverlayClick = isScrollPlayer ? togglePlay : useAdClick;

	return (
		<PlayerOverlay handleOverlayClick={handleOverlayClick}>
			{isScrollPlayer ? <PrerollPlayerScrollOverlay /> : <PrerollPlayerFullOverlay />}
			<OverlayTimeSliderBottom progressColor={'#FFC500'} />
		</PlayerOverlay>
	);
};

export default PrerollPlayerOverlay;
