import React from 'react';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import { formatTime } from 'jwplayer/utils/formatTime';

import styles from './VideoDetails.module.scss';

const VideoDetails: React.FC = () => {
	const playlistItem = usePlaylistItem();
	if (playlistItem?.duration === undefined || playlistItem?.title === undefined) return null;

	if (!(playlistItem.duration || playlistItem.title)) return null;

	return (
		<div className={styles.videoDetailsWrapper}>
			<div className={styles.videoLabel}>
				Watch
				<span className={styles.videoTime}>{formatTime(playlistItem.duration)}</span>
			</div>
			<div className={styles.videoTitle}>{playlistItem.title}</div>
		</div>
	);
};

export default VideoDetails;
