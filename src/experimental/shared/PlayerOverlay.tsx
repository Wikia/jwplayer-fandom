import React, { useState } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';

const PlayerOverlayStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: ${Number(WDSVariables.z7) + 2};
	box-sizing: border-box;
`;

const PlayerOverlay: React.FC = ({ children }) => {
	const [showOverlay, setShowOverlay] = useState(false);
	const [overlayTimeout, setOverlayTimeout] = useState(undefined);

	const handleMouseEnter = () => {
		if (overlayTimeout) {
			clearTimeout(overlayTimeout);
		}

		setShowOverlay(true);
	};

	const handleMouseLeave = () => {
		const hideOverlayTimeout: ReturnType<typeof setTimeout> = setTimeout(() => setShowOverlay(false), 600);
		setOverlayTimeout(hideOverlayTimeout);
	};

	return (
		<PlayerOverlayStyled onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
			{showOverlay && children}
		</PlayerOverlayStyled>
	);
};

export default PlayerOverlay;
