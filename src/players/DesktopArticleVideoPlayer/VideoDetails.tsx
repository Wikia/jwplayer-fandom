import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import usePlaylistItem from 'utils/usePlaylistItem';
import { formatTime } from 'utils/formatTime';

const VideoDetailsWrapper = styled.div`
	-webkit-font-smoothing: antialiased;
	background-color: #000;
	font-weight: 700;
	padding: 10px 12px;
`;

const VideoLabel = styled.div`
	color: #999;
	font-size: 12px;
	opacity: 0.5;
	text-transform: uppercase;
`;

const VideoTime = styled.span`
	border: 0;
	font: normal normal normal 100% inherit;
	margin: 0;
	padding: 0;
	vertical-align: baseline;
`;

const VideoTitle = styled.div`
	color: ${WDSVariables.wdsColorWhite};
	font-size: 14px;
`;

const VideoDetails: React.FC = () => {
	const { duration, title } = usePlaylistItem();

	return (
		<VideoDetailsWrapper>
			<VideoLabel>
				Watch
				<VideoTime>{formatTime(duration)}</VideoTime>
			</VideoLabel>
			<VideoTitle>{title}</VideoTitle>
		</VideoDetailsWrapper>
	);
};

export default VideoDetails;
