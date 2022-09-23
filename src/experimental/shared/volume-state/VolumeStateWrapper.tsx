import React, { useState } from 'react';
import VolumeButton from 'experimental/shared/volume-state/VolumeButton';
import UnmuteButton from 'experimental/shared/volume-state/UnmuteButton';
import VolumeSlider from 'experimental/shared/volume-state/VolumeSlider';
import useMute from 'jwplayer/utils/useMute';
import styled from 'styled-components';
import { VolumeStateWrapperProps } from 'experimental/types';

export const IconWrapper = styled.div`
	cursor: pointer;
	pointer-events: initial;
`;

const Wrapper = styled.div<{ color?: string }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${(props) => (props.color ? props.color : '#ffffff')};
`;

const VolumeStateWrapper: React.FC<VolumeStateWrapperProps> = ({ iconColor, hasSlider }) => {
	const isMute = useMute();
	const [hover, setHover] = useState(false);

	return (
		<Wrapper onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} color={iconColor}>
			{hasSlider && hover && <VolumeSlider />}
			{isMute ? <UnmuteButton hasLabel={true} /> : <VolumeButton />}
		</Wrapper>
	);
};

export default VolumeStateWrapper;
