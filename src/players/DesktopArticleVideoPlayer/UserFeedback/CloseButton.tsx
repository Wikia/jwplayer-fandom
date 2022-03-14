import React from 'react';
import styled from 'styled-components';
// import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconCrossSmall from '@fandom-frontend/react-common/dist/icons/IconCrossSmall';

const CloseWrapper = styled.div`
	cursor: pointer;
`;

interface CloseButtonProps {
	dismiss: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ dismiss }) => (
	<CloseWrapper onClick={dismiss}>
		<IconCrossSmall />
	</CloseWrapper>
);

export default CloseButton;
