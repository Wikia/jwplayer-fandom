import React from 'react';
import TimeSlider from 'experimental/shared/TimeSlider/TimeSlider';

import { TimeSliderProps } from 'experimental/types';

import styles from './overlayTimeSliderBottom.module.scss';

const OverlayTimeSliderBottom: React.FC<TimeSliderProps> = () => (
	<TimeSlider className={styles.overlayTimeSliderBottom} />
);

export default OverlayTimeSliderBottom;
