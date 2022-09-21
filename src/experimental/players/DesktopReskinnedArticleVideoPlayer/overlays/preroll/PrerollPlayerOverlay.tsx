import React from 'react';
import styled from 'styled-components';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { PrerollPlayerOverlayProps } from 'jwplayer/types';
import PrerollPlayerFullOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerFullOverlay';
import PrerollPlayerScrollOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerScrollOverlay';

import PrerollOverlayTimeSlider from './PrerollOverlayTimeSlider';

const StyledPrerollPlayerOverlay = styled(PlayerOverlay)`
	padding-bottom: 5px;
`;

const PrerollPlayerOverlay: React.FC<PrerollPlayerOverlayProps> = ({ isScrollPlayer }) => {
	return (
		<StyledPrerollPlayerOverlay>
			{isScrollPlayer ? <PrerollPlayerScrollOverlay /> : <PrerollPlayerFullOverlay />}
			<PrerollOverlayTimeSlider interactive={false} progressColor={'#FFC500'} />
		</StyledPrerollPlayerOverlay>
	);
};

export default PrerollPlayerOverlay;
