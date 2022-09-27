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
	color: ${(props) => props.color};
`;

const SoundButtonWrapper = styled.div`
	align-items: center;
	position: relative;
	cursor: pointer;
`;

const StyledSoundOffIcon = styled(IconSoundOff)`
	width: 44px;
	fill: ${(props) => props.fill};
`;

const StyledSoundIcon = styled(IconSound)`
	width: 44px;
	fill: ${(props) => props.fill};
`;

const VolumeStateWrapper: React.FC<VolumeStateWrapperProps> = ({
	iconColor = '#fff',
	sliderColor = 'rgb(0, 214, 214)',
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
		<Wrapper onClick={onClick} color={iconColor}>
			<SoundButtonWrapper onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
				{hasSlider && <VolumeSlider color={sliderColor} hover={hover} />}
				{mute ? <StyledSoundOffIcon fill={iconColor} /> : <StyledSoundIcon fill={iconColor} />}
			</SoundButtonWrapper>
			{mute && hasLabel && 'Play Sound'}
		</Wrapper>
	);
};

export default VolumeStateWrapper;
