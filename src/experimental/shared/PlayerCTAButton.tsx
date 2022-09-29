import React from 'react';
import styled from 'styled-components';
import { PlayerCTAButtonProps } from 'experimental/types';

const ButtonStyled = styled.button`
	width: 132px;
	height: 41px;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	border-radius: 2px;
	font-size: 14px;
	font-weight: 500px;
`;

const PlayerCTAButton: React.FC<PlayerCTAButtonProps> = ({ text, onClick }) => {
	return <ButtonStyled onClick={onClick}>{text}</ButtonStyled>;
};

export default PlayerCTAButton;
