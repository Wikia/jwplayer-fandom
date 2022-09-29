import React from 'react';
import styled from 'styled-components';
import useTime from 'jwplayer/utils/useTime';

const TimeRemainingWrapper = styled.div``;

const TimeRemaining: React.FC = () => {
	const time = useTime();

	return (
		<TimeRemainingWrapper>
			{time.position}/{time.duration}
		</TimeRemainingWrapper>
	);
};

export default TimeRemaining;
