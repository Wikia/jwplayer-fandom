import React from 'react';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import { formatTime } from 'jwplayer/utils/formatTime';

import clsx from 'clsx';

import styles from './videoDetails.module.scss';

interface VideoCollapsed {
	collapsed: boolean;
}

type VideoDetailsWrapperProps = VideoCollapsed;

const VideoDetailsWrapper: React.FC<VideoDetailsWrapperProps> = ({ collapsed }) => {
	const playlistItem = usePlaylistItem();

	if (!playlistItem) return null;

	const { duration, title } = playlistItem;

	return (
		<div className={clsx(styles.videoDetailsWrapper, { [styles.videoDetailsWrapperCollapsed]: collapsed === true })}>
			<h2
				className={clsx(
					{ [styles.videoTitleDidCollapsed]: collapsed === false },
					{ [styles.videoTitleDidNotCollapsed]: collapsed === true },
				)}
			>
				{title}
			</h2>
			<span className={styles.videoDuration}>{formatTime(duration)}</span>
		</div>
	);
};

interface VideoDetailsProps {
	playing: boolean;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ playing }) => {
	return <VideoDetailsWrapper collapsed={!playing} />;
};

export default VideoDetails;
