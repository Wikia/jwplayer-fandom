import React from 'react';
import VolumeButton from 'experimental/shared/volume-state/VolumeButton';
import UnmuteButton from 'experimental/shared/volume-state/UnmuteButton';
import useMute from 'jwplayer/utils/useMute';
import styled from 'styled-components';
import { VolumeStateWrapperProps } from 'experimental/types';

export const IconWrapper = styled.div`
	cursor: pointer;
	pointer-events: initial;
`;

const Wrapper = styled.div<{ color?: string }>`
	height: 44px;
	width: 44px;
	align-items: center;
	display: flex;
	justify-content: center;
	position: relative;
	color: ${(props) => (props.color ? props.color : '#ffffff')};

	&::hover {
		// Change this!
		color: green;
	}
`;

const VolumeStateWrapper: React.FC<VolumeStateWrapperProps> = ({ iconColor }) => {
	const isMute = useMute();

	return <Wrapper color={iconColor}>{isMute ? <UnmuteButton hasLabel={true} /> : <VolumeButton />}</Wrapper>;
};

export default VolumeStateWrapper;
