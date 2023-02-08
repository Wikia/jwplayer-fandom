import React, { useEffect } from 'react';
import styled from 'styled-components';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { PrerollPlayerOverlayProps } from 'experimental/types';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';
import PrerollPlayerFullOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerFullOverlay';

const PlayerOverlayTransparent = styled(PlayerOverlay)`
	background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 25%);
`;

const PrerollPlayerOverlay: React.FC<PrerollPlayerOverlayProps> = ({ isScrollPlayer }) => {
	useEffect(() => {
		document.querySelector<HTMLElement>('#featured-video__player_ad iframe').style.position = null;
	}, []);

	if (isScrollPlayer) return <OverlayTimeSliderBottom progressColor={'#FFC500'} canSeek={false} />;

	return (
		<PlayerOverlayTransparent showOverlay={true}>
			<PrerollPlayerFullOverlay />
			<OverlayTimeSliderBottom progressColor={'#FFC500'} canSeek={false} />
		</PlayerOverlayTransparent>
	);
};

export default PrerollPlayerOverlay;
