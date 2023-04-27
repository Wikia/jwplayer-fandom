import React from 'react';

import styles from './timeSlider.module.scss';

interface RailProps {
	railBackgroundColor?: string;
	color?: string;
}

export const Rail: React.FC<RailProps> = ({ railBackgroundColor }) => {
	const styleOverrides = {
		...(railBackgroundColor && { backgroundColor: railBackgroundColor }),
	};

	return <div className={styles.rail} style={styleOverrides} />;
};

interface BufferProps {
	percentageBuffered: number;
	bufferBackgroundColor?: string;
}

export const Buffer: React.FC<BufferProps> = ({ percentageBuffered, bufferBackgroundColor }) => {
	const styleOverrides = {
		...(percentageBuffered && { width: `${percentageBuffered}%` }),
		...(bufferBackgroundColor && { backgroundColor: bufferBackgroundColor }),
	};

	return <div className={styles.progress} style={styleOverrides} />;
};

interface ProgressProps {
	progress: number;
	dragging: boolean;
	progressBackgroundColor?: string;
}

export const Progress: React.FC<ProgressProps> = ({ progress, dragging, progressBackgroundColor }) => {
	const styleOverrides = {
		...{ width: dragging ? `${progress}px` : `${progress}%` },
		...(progressBackgroundColor && { backgroundColor: progressBackgroundColor }),
	};

	return <div className={styles.buffer} style={styleOverrides} />;
};

interface ProgressKnobProps {
	progress: number;
	dragging: boolean;
	progressKnobColor: string;
}

export const ProgressKnob: React.FC<ProgressKnobProps> = ({ dragging, progress }) => {
	const styleOverrides = {
		...{ left: dragging ? `${progress}px` : `${progress}%` },
	};

	return <div className={styles.progressKnob} style={styleOverrides} />;
};
