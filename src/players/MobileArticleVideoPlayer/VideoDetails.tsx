import React from 'react';
import usePlaylistItem from 'utils/usePlaylistItem';
import styled from 'styled-components';

const VideoDetailsWrapper = styled.div`
	background-color: #fff;
`;

const VideoTitle = styled.h2``;

const VideoDuration = styled.span``;

const VideoDetails: React.FC = () => {
	const { duration, title } = usePlaylistItem();

	const formatTime = (duration) => {
		const hours = Math.floor(duration / 3600);
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : ''}${seconds}`;
	};

	return (
		<VideoDetailsWrapper>
			<VideoTitle>{title}</VideoTitle>
			<VideoDuration>{formatTime(duration)}</VideoDuration>
		</VideoDetailsWrapper>
	);
};

export default VideoDetails;
