import React, { useContext } from 'react';
import clsx from 'clsx';
import IconCrossTiny from '@fandom-frontend/react-common/dist/icons/IconCrossTiny';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { jwPlayerPlaybackTracker } from 'jwplayer/utils/videoTracking';
import { getCommunicationService } from 'jwplayer/utils/communication/communicationService';

import styles from './closeButton.module.scss';

interface CloseButtonProps {
	className?: string;
	style?: Record<string, string>;
	dismiss: () => void;
	iconColor?: string;
	iconSize?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, dismiss, style, iconColor, iconSize }) => {
	const { player } = useContext(PlayerContext);
	const communicationService = getCommunicationService();

	const onClickClose = (event) => {
		event.stopPropagation();
		jwPlayerPlaybackTracker({ event_name: 'video_player_close' });
		communicationService.dispatch({
			type: '[Video] Close button clicked',
			payload: {
				player: 'JW player',
			},
		});
		player.pause();
		dismiss();
	};

	return (
		<div className={clsx(className, styles.closeWrapper)} onClick={onClickClose} style={style}>
			<IconCrossTiny fill={iconColor} width={iconSize || '1em'} height={iconSize || '1em'} />
		</div>
	);
};

export default CloseButton;
