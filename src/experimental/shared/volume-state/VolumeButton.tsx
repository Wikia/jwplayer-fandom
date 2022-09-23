import React, { useContext } from 'react';
import styled from 'styled-components';
// import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconSound from '@fandom-frontend/react-common/dist/icons/IconSound';
// import { VolumeButtonProps } from 'experimental/types';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const VolumeButtonWrapper = styled.div`
	align-items: center;
	cursor: pointer;
`;

const StyledSoundIcon = styled(IconSound)`
	fill: #fff;
`;

const VolumeButton: React.FC = () => {
	const { player } = useContext(PlayerContext);
	const mute = () => {
		player?.setMute(true);
	};

	return (
		<VolumeButtonWrapper onClick={mute}>
			<StyledSoundIcon />
		</VolumeButtonWrapper>
	);
};

export default VolumeButton;
