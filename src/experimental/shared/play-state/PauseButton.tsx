import React, { useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { IconWrapper } from 'experimental/shared/play-state/PlayStateWrapper';
import PauseIcon from 'experimental/shared/icons/play/PauseIcon';
import { PauseButtonProps } from 'experimental/types';

const PauseButton: React.FC<PauseButtonProps> = ({ onClickCallback, isAd, iconSize }) => {
	const { player } = useContext(PlayerContext);
	const onClickPause = () => {
		/* Tracking events should already be handled in a wrapping component.
		 * When using this component, its best to check if the pause event fires as intended. */
		isAd ? player.pauseAd(true) : player.pause();

		if (onClickCallback) {
			onClickCallback();
		}
	};

	return (
		<IconWrapper onClick={onClickPause}>
			<PauseIcon height={iconSize || '16px'} width={iconSize || '16px'} />
		</IconWrapper>
	);
};

export default PauseButton;
