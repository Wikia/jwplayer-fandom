import React from 'react';
import { PlayerFullOverlayTopTextProps } from 'experimental/types';

import styles from './PlayerFullOverlayTopText.module.css';

const PlayerFullOverlayTopText: React.FC<PlayerFullOverlayTopTextProps> = ({ upperText, lowerText }) => {
	return (
		<div className={styles.textWrapper}>
			<div className={styles.upperText}>{upperText}</div>
			<div className={styles.lowerText}>{lowerText}</div>
		</div>
	);
};

export default PlayerFullOverlayTopText;
