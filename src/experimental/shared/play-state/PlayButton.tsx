import React, { useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { IconWrapper } from 'experimental/shared/play-state/PlayStateWrapper';
import PlayIcon from 'experimental/shared/icons/play/PlayIcon';

export interface PlayButtonProps {
	/** Optional, additional events that should fire whenever the Play button is pressed.
	 *  The actual video player "play" event will already be handled in the onClickPlay function.
	 *
	 *  There is no need to call the player.play() event in this callback */
	onClickCallback?: () => void;
	isAd?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClickCallback, isAd }) => {
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
			<PlayIcon />
		</IconWrapper>
	);
};

export default PlayButton;
