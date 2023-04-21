import React from 'react';
import { PlayerFullOverlayWrapper } from 'experimental/shared/FullOverlay/PlayerFullOverlayWrapper';

import styles from './DesktopPlayerFullOverlayWrapper.module.css';

export const DesktopPlayerFullOverlayWrapper: React.FC = () => (
	<PlayerFullOverlayWrapper className={styles.desktopPlayerFullOverlayWrapper} />
);

export default DesktopPlayerFullOverlayWrapper;
