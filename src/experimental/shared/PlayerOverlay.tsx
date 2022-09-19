import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';

const PlayerOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: ${Number(WDSVariables.z7) + 2};
	box-sizing: border-box;
	padding: 1em 1.6em;
`;

export default PlayerOverlay;
