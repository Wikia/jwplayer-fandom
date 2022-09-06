import React, { useContext } from 'react';
import IconPlaySmall from '@fandom-frontend/react-common/dist/icons/IconPlaySmall';
import styled from 'styled-components';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const PlayWrapper = styled.div`
	cursor: pointer;
	pointer-events: initial;
`;

const PlayIcon = styled(IconPlaySmall)`
	/*TODO: Convert fill color to props*/
	fill: rgb(204, 204, 204);
	height: 24px;
	height: 24px;
	pointer-events: none;
`;

export interface PlayButtonProps {
	/** Optional, additional events that should fire whenever the Play button is pressed.
	 *  The actual video player "play" event will already be handled in the onClickPlay function.
	 *
	 *  There is no need to call the player.play() event in this callback */
	onClickCallback?: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClickCallback }) => {
	const { player } = useContext(PlayerContext);
	const onClickPlay = () => {
		/* Tracking events should already be handled in a wrapping component.
		 * When using this component, its best to check if the play event fires as intended. */
		player.play();
		if (onClickCallback) {
			onClickCallback();
		}
	};

	return (
		<PlayWrapper onClick={onClickPlay}>
			<PlayIcon />
		</PlayWrapper>
	);
};

export default PlayButton;
