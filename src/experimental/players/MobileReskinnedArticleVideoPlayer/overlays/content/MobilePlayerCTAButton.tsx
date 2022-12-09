import React from 'react';
import styled from 'styled-components';
import { PlayerCTAButtonProps } from 'experimental/types';
import IconExternal from '@fandom-frontend/react-common/dist/icons/IconExternal';

const ButtonStyled = styled.div<{ isScrollPlayer: boolean }>`
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	border-radius: 2px;
	fill: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 21px;
	font-size: 12px;
	font-weight: 500px;
	padding: 5px 10px;
`;

const IconStyled = styled(IconExternal)<{ isScrollPlayer: boolean }>`
	width: 12px;
	height: 12px;
	margin-left: 5px;
`;

const PlayerCTAButton: React.FC<PlayerCTAButtonProps> = ({ text, onClick, isScrollPlayer = false }) => {
	return (
		<ButtonStyled isScrollPlayer={isScrollPlayer} onClick={onClick}>
			{text} <IconStyled isScrollPlayer={isScrollPlayer} />
		</ButtonStyled>
	);
};

export default PlayerCTAButton;
