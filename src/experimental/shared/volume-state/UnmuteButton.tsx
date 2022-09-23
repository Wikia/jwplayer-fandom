import React, { useContext } from 'react';
import styled from 'styled-components';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import { UnmuteButtonProps } from 'experimental/types';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const UnmuteButtonWrapper = styled.div`
	align-items: center;
	cursor: pointer;
`;

const StyledSoundIcon = styled(IconSoundOff)`
	fill: #fff;
`;

const UnmuteButton: React.FC<UnmuteButtonProps> = ({ hasLabel }) => {
	const { player } = useContext(PlayerContext);
	const unmute = () => {
		player?.setMute(false);
	};

	return (
		<UnmuteButtonWrapper onClick={unmute}>
			<StyledSoundIcon />
			{hasLabel ? 'Play Sound' : null}
		</UnmuteButtonWrapper>
	);
};

export default UnmuteButton;
