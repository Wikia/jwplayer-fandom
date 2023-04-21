import React from 'react';
import { PlayerFullOverlayWrapper } from 'experimental/shared/FullOverlay/PlayerFullOverlayWrapper';

import styles from './MobilePlayerFullOverlayWrapper.module.css';

export const MobilePlayerFullOverlayWrapper: React.FC = () => (
	<PlayerFullOverlayWrapper className={styles.mobilePlayerFullOverlayWrapper} />
);

export default MobilePlayerFullOverlayWrapper;
