import React from 'react';
import IconExternalTiny from '@fandom-frontend/react-common/dist/icons/IconExternalTiny';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';

import styles from './Attribution.module.css';

const Attribution: React.FC = () => {
	const playlistItem = usePlaylistItem();
	if (playlistItem?.username === undefined || playlistItem?.userUrl === undefined) return null;

	return (
		<div className={styles.attributionWrapper}>
			<a className={styles.usernameLink} href={playlistItem.userUrl}>
				{playlistItem.username}
			</a>
			<a className={styles.iconLink} href={playlistItem.userUrl}>
				<IconExternalTiny />
			</a>
		</div>
	);
};

export default Attribution;
