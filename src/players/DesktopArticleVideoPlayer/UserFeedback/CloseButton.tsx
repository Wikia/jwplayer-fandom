import React from 'react';
import styled from 'styled-components';
// import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconCrossSmall from '@fandom-frontend/react-common/dist/icons/IconCrossSmall';

const CloseWrapper = styled.div`
	cursor: pointer;
`;

interface CloseButtonProps {
	dismissed: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ dismissed }) => (
	<CloseWrapper onClick={dismissed}>
		<IconCrossSmall />
	</CloseWrapper>
);

export default CloseButton;
