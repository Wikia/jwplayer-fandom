import React from 'react';
import styled from 'styled-components';
import { CaptionsSelectOpenProps } from 'experimental/types';
import IconBubble from '@fandom-frontend/react-common/dist/icons/IconBubble';

const StyledIconBubble = styled(IconBubble)`
	fill: #fff;
	flex-shrink: 0;
	height: 14px;
	margin-right: 6px;
	min-width: 14px;
	width: 14px;
`;

const CaptionsSelectOpen: React.FC<CaptionsSelectOpenProps> = ({ handleOpen }) => {
	const handleOpenCaptions = (event) => {
		event.stopPropagation();
		handleOpen();
	};

	return <StyledIconBubble onClick={handleOpenCaptions} />;
};

export default CaptionsSelectOpen;
