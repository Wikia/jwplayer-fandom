import React, { useContext } from 'react';
import IconPauseSmall from '@fandom-frontend/react-common/dist/icons/IconPauseSmall';
import styled from 'styled-components';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { IconWrapper, playStateIconStyles } from 'experimental/shared/play-state/PlayStateWrapper';

const PauseIcon = styled(IconPauseSmall)`
	${playStateIconStyles}
`;

export interface PauseButtonProps {
	/** Optional, additional events that should fire whenever the pause button is pressed.
	 *  The actual video player "pause" event will already be handled in the onClickPause function.
	 *
	 *  There is no need to call the player.pause() event in this callback */
	onClickCallback?: () => void;
}

const PauseButton: React.FC<PauseButtonProps> = ({ onClickCallback }) => {
	const { player } = useContext(PlayerContext);
	const onClickPause = () => {
		/* Tracking events should already be handled in a wrapping component.
		 * When using this component, its best to check if the pause event fires as intended. */
		player.pause();
		if (onClickCallback) {
			onClickCallback();
		}
	};

	return (
		<IconWrapper onClick={onClickPause}>
			<PauseIcon />
		</IconWrapper>
	);
};

export default PauseButton;
