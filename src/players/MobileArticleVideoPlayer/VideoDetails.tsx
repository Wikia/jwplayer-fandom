import React from 'react';
import usePlaylistItem from 'utils/usePlaylistItem';
import styled from 'styled-components';
import { formatTime } from 'utils/formatTime';

const VideoDetailsWrapper = styled.div`
	background-color: #fff;
`;

const VideoTitle = styled.h2``;

const VideoDuration = styled.span``;

const VideoDetails: React.FC = () => {
	const { duration, title } = usePlaylistItem();

	return (
		<VideoDetailsWrapper>
			<VideoTitle>{title}</VideoTitle>
			<VideoDuration>{formatTime(duration)}</VideoDuration>
		</VideoDetailsWrapper>
	);
};

export default VideoDetails;
