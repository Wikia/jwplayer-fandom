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
	background-color: transparent;
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

export const ControlBarButtonWrapper = styled.div`
	display: flex;
	flex-flow: row nowrap;
	flex: 1 1 auto;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	padding: 0 12px;

	&::after {
		content: '';
		flex-grow: 1;
		order: 0;
	}
`;

export const ControlBarLeftAlignedButtonContainer = styled.div``;

export const ControlBarRightAlignedButtonContainer = styled.div`
	order: 1;
`;

export default ControlBarWrapper;
