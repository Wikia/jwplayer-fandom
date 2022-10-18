import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import { PlayerOverlayProps } from 'experimental/types';

const PlayerOverlayStyled = styled.div.attrs((props: { showOverlay: boolean }) => props)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: ${Number(WDSVariables.z7) + 2};
	box-sizing: border-box;
	background-color: rgb(0, 0, 0, 0.4);
	opacity: ${(props) => (props.showOverlay ? '1' : '0')};
`;

const PlayerOverlay: React.FC<PlayerOverlayProps> = ({ children, forceOverlay = false }) => {
	const hideOverlayTimeout = () => {
		const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
			setShowOverlay(false);
			setOverlayTimeout(undefined);
		}, 2000);
		return timeout;
	};

	const [showOverlay, setShowOverlay] = useState(false);
	const [overlayTimeout, setOverlayTimeout] = useState(undefined);

	useEffect(() => {
		setShowOverlay(true);
		setOverlayTimeout(hideOverlayTimeout());
	}, []);

	const handleMouseEnter = () => {
		if (overlayTimeout) {
			clearTimeout(overlayTimeout);
			setOverlayTimeout(undefined);
		}

		setShowOverlay(true);
	};

	const handleMouseLeave = () => {
		setOverlayTimeout(hideOverlayTimeout());
	};

	return (
		<PlayerOverlayStyled
			showOverlay={showOverlay || forceOverlay}
			onMouseEnter={() => handleMouseEnter()}
			onMouseLeave={() => handleMouseLeave()}
		>
			{children}
		</PlayerOverlayStyled>
	);
};

export default PlayerOverlay;
