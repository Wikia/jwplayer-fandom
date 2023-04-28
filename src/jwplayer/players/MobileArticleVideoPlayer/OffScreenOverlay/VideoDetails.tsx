import React from 'react';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import { formatTime } from 'jwplayer/utils/formatTime';

import clsx from 'clsx';

import styles from './videoDetails.module.scss';

interface VideoCollapsed {
	collapsed: boolean;
}

type VideoDetailsWrapperProps = VideoCollapsed;

const VideoDetailsWrapper: React.FC<VideoDetailsWrapperProps> = ({ collapsed }) => (
	<div className={clsx(styles.videoDetailsWrapper, collapsed && styles.videoDetailsWrapperCollapsed)} />
);

type VideoTitleProps = VideoCollapsed;

const VideoTitle: React.FC<VideoTitleProps> = ({ collapsed }) => (
	<h2 className={clsx(collapsed ? styles.videoTitleDidCollapsed : styles.videoTitleDidNotCollapsed)} />
);

const VideoDuration: React.FC = () => <span className={styles.videoDuration} />;

interface VideoDetailsProps {
	playing: boolean;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ playing }) => {
	const playlistItem = usePlaylistItem();

	if (!playlistItem) return null;

	const { duration, title } = playlistItem;

	return (
		<VideoDetailsWrapper collapsed={!playing}>
			<VideoTitle collapsed={!playing}>{title}</VideoTitle>
			<VideoDuration>{formatTime(duration)}</VideoDuration>
		</VideoDetailsWrapper>
	);
};

export default VideoDetails;
