import React, { useState, useContext } from 'react';
import useMute from 'jwplayer/utils/useMute';
import styled from 'styled-components';
import { VolumeStateWrapperProps } from 'experimental/types';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import IconSound from '@fandom-frontend/react-common/dist/icons/IconSound';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import VolumeSlider from 'experimental/shared/volume-state/VolumeSlider';

export const IconWrapper = styled.div`
	cursor: pointer;
	pointer-events: initial;
`;

const Wrapper = styled.div<{ color?: string }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: ${(props) => (props.color ? props.color : '#ffffff')};
`;

const SoundButtonWrapper = styled.div`
	align-items: center;
	position: relative;
	cursor: pointer;
`;

const StyledSoundOffIcon = styled(IconSoundOff)`
	width: 44px;
	fill: #fff;
`;

const StyledSoundIcon = styled(IconSound)`
	width: 44px;
	fill: #fff;
`;

const VolumeStateWrapper: React.FC<VolumeStateWrapperProps> = ({
	iconColor = '#fff',
	hasSlider = true,
	hasLabel = false,
}) => {
	const { player } = useContext(PlayerContext);
	const mute = useMute();
	const [hover, setHover] = useState(false);

	const onClick = () => {
		player?.setMute(!mute);
	};

	return (
		<Wrapper color={iconColor}>
			<SoundButtonWrapper onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
				{hasSlider && hover && <VolumeSlider />}
				{mute ? <StyledSoundOffIcon /> : <StyledSoundIcon />}
			</SoundButtonWrapper>
			{hasLabel && 'Play Sound'}
		</Wrapper>
	);
};

export default VolumeStateWrapper;
