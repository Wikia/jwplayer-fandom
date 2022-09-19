import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';

const ControlBarWrapper = styled.div`
	/*	position: relative;
	background: rgba(0, 0, 0, 0.5);
	bottom: 34px;
	background-color: gray;
	max-height: 140px;

	display: flex;*/

	align-items: center;
	background-color: rgba(255, 255, 255, 0.9);
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 2px;
	cursor: pointer;
	width: 100%;
	padding: inherit;
	position: absolute;
	bottom: 0px;
	left: 0px;
	max-height: 140px;
	box-sizing: border-box;
	z-index: ${Number(WDSVariables.z8)};

	display: flex;
	flex-direction: column;
`;

export default ControlBarWrapper;
