import React, { useContext } from 'react';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import useMute from 'jwplayer/utils/useMute';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

import styles from './UnmuteButton.module.css';

const UnmuteButton: React.FC = () => {
	const { player } = useContext(PlayerContext);
	const muted = useMute();

	const unmute = () => {
		player?.setMute(false);
	};

	if (!muted) return null;

	return (
		<div onClick={unmute} className={styles.unmuteButtonWrapper}>
			<IconSoundOff className={styles.soundIcon} />
			{/* TODO: use i18n */}
			Play Sound
		</div>
	);
};

export default UnmuteButton;
