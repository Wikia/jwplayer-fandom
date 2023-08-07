import React from 'react';
import clsx from 'clsx';

import shared from '../../../../shared/FullOverlay/playerFullOverlayWrapper.module.scss';

import styles from './DesktopPlayerFullOverlayWrapper.module.css';

export const DesktopPlayerFullOverlayWrapper: React.FC = () => (
	<div className={clsx(shared.playerFullOverlayWrapper, styles.desktopPlayerFullOverlayWrapper)} />
);

export default DesktopPlayerFullOverlayWrapper;
