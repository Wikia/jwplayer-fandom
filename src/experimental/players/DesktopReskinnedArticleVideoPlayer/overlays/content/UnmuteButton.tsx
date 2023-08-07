import React, { useContext, useState } from 'react';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

import styles from './UnmuteButton.module.scss';

const UnmuteButton: React.FC = () => {
	const { player } = useContext(PlayerContext);
	const [muted, setMuted] = useState(true);
	const unmute = () => {
		player?.setMute(false);
		setMuted(false);
	};

	if (!muted) return null;

	return (
		<div className={styles.unmuteButtonWrapper} onClick={unmute}>
			<IconSoundOff className={styles.soundIcon} />
			{/* TODO: use i18n */}
			Play Sound
		</div>
	);
};

export default UnmuteButton;
