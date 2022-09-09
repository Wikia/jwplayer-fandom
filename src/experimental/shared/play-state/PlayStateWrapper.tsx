import React from 'react';
import PlayButton, { PlayButtonProps } from 'experimental/shared/play-state/PlayButton';
import PauseButton, { PauseButtonProps } from 'experimental/shared/play-state/PauseButton';
import usePlaying from 'jwplayer/utils/usePlaying';
import styled, { css } from 'styled-components';

interface PlayStateWrapperProps {
	playConfig?: PlayButtonProps;
	pauseConfig?: PauseButtonProps;
	iconColor?: string;
}

export const playStateIconStyles = css`
	fill: currentColor;
	height: 24px;
	height: 24px;
	pointer-events: none;
`;

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
	color: ${(props) => (props.color ? props.color : 'rgb(204, 204, 204)')};
`;

const PlayStateWrapper: React.FC<PlayStateWrapperProps> = ({ playConfig, pauseConfig, iconColor }) => {
	const isPlaying = usePlaying();

	return (
		<Wrapper color={iconColor}>
			{isPlaying ? (
				<PauseButton onClickCallback={pauseConfig?.onClickCallback} />
			) : (
				<PlayButton onClickCallback={playConfig?.onClickCallback} />
			)}
		</Wrapper>
	);
};

export default PlayStateWrapper;
