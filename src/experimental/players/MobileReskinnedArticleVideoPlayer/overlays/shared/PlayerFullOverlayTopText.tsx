import React from 'react';
import styled from 'styled-components';
import { PlayerFullOverlayTopTextProps } from 'experimental/types';

const TextWrapper = styled.div`
	color: #eee;
`;

const UpperText = styled.div`
	font-weight: 400;
	font-size: 12px;
	margin-bottom: 5px;
`;

const LowerText = styled.div`
	font-weight: 400;
	font-size: 16px;
`;

const PlayerFullOverlayTopText: React.FC<PlayerFullOverlayTopTextProps> = ({ upperText, lowerText }) => {
	return (
		<TextWrapper>
			<UpperText>{upperText}</UpperText>
			<LowerText>{lowerText}</LowerText>
		</TextWrapper>
	);
};

export default PlayerFullOverlayTopText;
