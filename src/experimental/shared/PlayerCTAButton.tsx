import React from 'react';
import styled, { css } from 'styled-components';
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

	${(props) =>
		props.isScrollPlayer
			? css`
					width: 100px;
					height: 31px;
					font-size: 12px;
					font-weight: 500px;
					margin-right: 10px;
			  `
			: css`
					width: 132px;
					height: 41px;
					font-size: 14px;
					font-weight: 500px;
			  `}
`;

const IconStyled = styled(IconExternal)<{ isScrollPlayer: boolean }>`
	${(props) =>
		props.isScrollPlayer
			? css`
					width: 12px;
					height: 12px;
					margin-left: 6px;
			  `
			: css`
					width: 14px;
					height: 14px;
					margin-left: 7px;
			  `}
`;

const PlayerCTAButton: React.FC<PlayerCTAButtonProps> = ({ text, onClick, isScrollPlayer = false }) => {
	return (
		<ButtonStyled isScrollPlayer={isScrollPlayer} onClick={onClick}>
			{text} <IconStyled isScrollPlayer={isScrollPlayer} />
		</ButtonStyled>
	);
};

export default PlayerCTAButton;
