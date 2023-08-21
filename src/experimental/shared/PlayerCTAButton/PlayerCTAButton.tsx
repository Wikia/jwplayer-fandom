import React from 'react';
import clsx from 'clsx';
import { PlayerCTAButtonProps } from 'experimental/types';
import IconExternal from '@fandom-frontend/react-common/dist/icons/IconExternal';

import styles from './playerCTAButton.module.scss';

export interface ButtonStyledProps extends React.HTMLAttributes<HTMLButtonElement> {
	isScrollPlayer: boolean;
}

const ButtonStyled: React.FC<ButtonStyledProps> = ({ isScrollPlayer }) => (
	<div className={clsx(styles.buttonStyled, isScrollPlayer ? styles.btnIsScrollPlayer : styles.btnIsNotScrollPlayer)} />
);

const IconStyled: React.FC<{ isScrollPlayer: boolean }> = ({ isScrollPlayer }) => (
	<IconExternal className={clsx(isScrollPlayer ? styles.iconIsScrollPlayer : styles.iconIsNotScrollPlayer)} />
);

const PlayerCTAButton: React.FC<PlayerCTAButtonProps> = ({ text, onClick, isScrollPlayer = false }) => {
	return (
		<ButtonStyled isScrollPlayer={isScrollPlayer} onClick={onClick}>
			{text} <IconStyled isScrollPlayer={isScrollPlayer} />
			<button />
		</ButtonStyled>
	);
};

export default PlayerCTAButton;
