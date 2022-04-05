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

	&:before {
		content: '•';
		padding: 0px 2px;
	}
`;

const VideoTitle = styled.div`
	color: ${WDSVariables.wdsColorWhite};
	font-size: 14px;
`;

const VideoDetails: React.FC = () => {
	const playlistItem = usePlaylistItem();
	if (playlistItem?.duration === undefined || playlistItem?.title === undefined) return null;

	if (!(playlistItem.duration || playlistItem.title)) return null;

	return (
		<VideoDetailsWrapper>
			<VideoLabel>
				Watch
				<VideoTime>{formatTime(playlistItem.duration)}</VideoTime>
			</VideoLabel>
			<VideoTitle>{playlistItem.title}</VideoTitle>
		</VideoDetailsWrapper>
	);
};

export default VideoDetails;
