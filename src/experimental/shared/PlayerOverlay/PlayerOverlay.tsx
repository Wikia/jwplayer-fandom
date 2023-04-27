import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import { PlayerOverlayProps } from 'experimental/types';

const PlayerOverlayStyled = styled.div.attrs((props: { showOverlay: boolean }) => props)`
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: ${Number(WDSVariables.z7) + 2};
	box-sizing: border-box;
	background-color: rgb(0, 0, 0, 0.4);
	opacity: ${(props) => (props.showOverlay ? '1' : '0')};
	transition: opacity 0.2s;
	cursor: pointer;
`;

const PlayerOverlay: React.FC<PlayerOverlayProps> = ({ children, handleOverlayClick, className, showOverlay }) => {
	return (
		<PlayerOverlayStyled className={className} showOverlay={showOverlay} onClick={handleOverlayClick}>
			{children}
		</PlayerOverlayStyled>
	);
};

export default PlayerOverlay;
