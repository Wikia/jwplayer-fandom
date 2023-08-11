import React from 'react';
import { PlayerCTAButtonProps } from 'experimental/types';
import IconExternal from '@fandom-frontend/react-common/dist/icons/IconExternal';

import styles from './MobilePlayerCTAButton.module.css';

const PlayerCTAButton: React.FC<PlayerCTAButtonProps> = ({ text, onClick }) => {
	return (
		<div onClick={onClick} className={styles.button}>
			{text} <IconExternal className={styles.icon} />
		</div>
	);
};

export default PlayerCTAButton;
