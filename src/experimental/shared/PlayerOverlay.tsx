import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';

const PlayerOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: ${Number(WDSVariables.z7) + 2};
`;

export default PlayerOverlay;
