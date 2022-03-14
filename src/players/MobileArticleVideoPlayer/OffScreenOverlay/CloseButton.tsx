import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconCrossTiny from '@fandom-frontend/react-common/dist/icons/IconCrossTiny';

const CloseWrapper = styled.div`
	cursor: pointer;
	pointer-events: initial;
	height: 36px;
	width: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.98;
	position: absolute;
	right: 0;
	top: 0;
`;

const CrossIcon = styled(IconCrossTiny)`
	fill: ${WDSVariables.wdsColorWhite};
`;

interface CloseButtonProps {
	dismiss: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ dismiss }) => (
	<CloseWrapper onClick={dismiss}>
		<CrossIcon />
	</CloseWrapper>
);

export default CloseButton;
