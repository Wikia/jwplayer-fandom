import React from 'react';
import PlayButton from 'experimental/shared/play-state/PlayButton';
import PauseButton from 'experimental/shared/play-state/PauseButton';
import { PlayStateWrapperProps } from 'experimental/types';
import usePlaying from 'jwplayer/utils/usePlaying';
import useAdPlaying from 'jwplayer/utils/useAdPlaying';
import styled from 'styled-components';

export const IconWrapper = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Wrapper = styled.div<{ color?: string }>`
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

const PlayStateWrapper: React.FC<PlayStateWrapperProps> = ({
	playConfig,
	pauseConfig,
	iconColor,
	isAd,
	className,
	iconSize,
}) => {
	const isPlaying = isAd ? useAdPlaying() : usePlaying();

	return (
		<Wrapper color={iconColor} className={className}>
			{isPlaying ? (
				<PauseButton onClickCallback={pauseConfig?.onClickCallback} isAd={isAd} iconSize={iconSize} />
			) : (
				<PlayButton onClickCallback={playConfig?.onClickCallback} isAd={isAd} iconSize={iconSize} />
			)}
		</Wrapper>
	);
};

export default PlayStateWrapper;
