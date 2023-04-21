import React, { useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import IconBubble from '@fandom-frontend/react-common/dist/icons/IconBubble';
import useCurrentCaption from 'jwplayer/utils/useCurrentCaption';
import { ToggleCaptionsProps } from 'experimental/types';

import styles from './ToggleCaptions.module.css';

const ToggleCaptions: React.FC<ToggleCaptionsProps> = ({ resetOverlayTimeout }) => {
	const currentCaption = useCurrentCaption();
	const { player } = useContext(PlayerContext);

	const handleToggleCaptions = (event) => {
		event.stopPropagation();
		currentCaption === 0 ? player.setCurrentCaptions(1) : player.setCurrentCaptions(0);
		resetOverlayTimeout();
	};

	const isActive = currentCaption === 1;

	return (
		<div className={styles.iconWrapper} onClick={handleToggleCaptions}>
			<IconBubble className={`${styles.iconBubble} ${() => (isActive ? styles.iconBubbleActive : '')}`} />
		</div>
	);
};

export default ToggleCaptions;
