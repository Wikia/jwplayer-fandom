import React from 'react';
import styled from 'styled-components';
import useTime from 'jwplayer/utils/useTime';

const TimeRemainingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	color: #fff;
`;

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
		<TimeRemainingWrapper className={className}>
			{formatTime(time.position)} / {formatTime(time.duration)}
		</TimeRemainingWrapper>
	);
};

export default TimeRemaining;
