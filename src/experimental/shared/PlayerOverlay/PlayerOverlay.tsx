import React from 'react';
import { PlayerOverlayProps } from 'experimental/types';

import clsx from 'clsx';

import styles from './PlayerOverlay.module.scss';

const PlayerOverlay: React.FC<PlayerOverlayProps> = ({ children, handleOverlayClick, className, showOverlay }) => {
	return (
		<div
			className={clsx(styles.playerOverlayStyled, {
				[className]: !!className,
				[styles['showOverlay']]: showOverlay,
			})}
			onClick={handleOverlayClick}
		>
			{children}
		</div>
	);
};

export default PlayerOverlay;
