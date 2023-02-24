import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import CloseButton from 'youtube/players/shared/CloseButton';

const OffScreenOverlayWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: ${Number(WDSVariables.z7) + 2};
`;

interface OffScreenOverlayProps {
	dismiss: () => void;
	isScrollPlayer: boolean;
}

const MobileYoutubeOffScreenOverlay: React.FC<OffScreenOverlayProps> = ({ dismiss, isScrollPlayer }) => {
	if (!isScrollPlayer) return null;

	return (
		<OffScreenOverlayWrapper>
			<CloseButton deviceType={'mobile'} dismiss={dismiss} />
		</OffScreenOverlayWrapper>
	);
};

export default MobileYoutubeOffScreenOverlay;
