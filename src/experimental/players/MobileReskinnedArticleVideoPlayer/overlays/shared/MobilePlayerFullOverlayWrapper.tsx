import React from 'react';
import clsx from 'clsx';

import shared from '../../../../shared/FullOverlay/playerFullOverlayWrapper.module.scss';

import styles from './MobilePlayerFullOverlayWrapper.module.css';

export const MobilePlayerFullOverlayWrapper: React.FC = () => (
	<div className={clsx(shared.playerFullOverlayWrapper, styles.mobilePlayerFullOverlayWrapper)} />
);

export default MobilePlayerFullOverlayWrapper;
