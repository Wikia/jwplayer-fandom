import React, { useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { IconWrapper } from 'experimental/shared/play-state/PlayStateWrapper';
import PlayIcon from 'experimental/shared/icons/play/PlayIcon';
import { PlayButtonProps } from 'experimental/types';

const PlayButton: React.FC<PlayButtonProps> = ({ onClickCallback, isAd, iconSize }) => {
	const { player } = useContext(PlayerContext);
	const onClickPlay = () => {
		/* Tracking events should already be handled in a wrapping component.
		 * When using this component, its best to check if the play event fires as intended. */
		isAd ? player.pauseAd(false) : player.play();

		if (onClickCallback) {
			onClickCallback();
		}
	};

	return (
		<IconWrapper onClick={onClickPlay}>
			<PlayIcon height={iconSize || '16px'} width={iconSize || '16px'} />
		</IconWrapper>
	);
};

export default PlayButton;
