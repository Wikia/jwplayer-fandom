import React from 'react';
import IconExternalTiny from '@fandom-frontend/react-common/dist/icons/IconExternalTiny';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';

import styles from './Attribution.module.css';

const Attribution: React.FC = () => {
	const playlistListItem = usePlaylistItem();

	if (playlistListItem?.username === undefined || playlistListItem?.userUrl === undefined) return null;

	return (
		<div className={styles.attributionWrapper}>
			<a className={styles.usernameLink} href={playlistListItem.userUrl}>
				{playlistListItem.username}
			</a>
			<a className={styles.iconLink} href={playlistListItem.userUrl}>
				<IconExternalTiny />
			</a>
		</div>
	);
};

export default Attribution;
