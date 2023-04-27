import React from 'react';
import clsx from 'clsx';
import useTime from 'jwplayer/utils/useTime';

import styles from './timeRemaining.module.scss';

interface TimeRemainingProps {
	className?: string;
}

const TimeRemaining: React.FC<TimeRemainingProps> = ({ className }) => {
	const time = useTime();

	const formatTime = (time) => {
		if (time < 3600) {
			return new Date(time * 1000).toISOString().substring(14, 19);
		} else {
			return new Date(time * 1000).toISOString().substring(11, 16);
		}
	};

	return (
		<div className={clsx(className, styles.timeRemainingWrapper)}>
			{formatTime(time.position)} / {formatTime(time.duration)}
		</div>
	);
};

export default TimeRemaining;
