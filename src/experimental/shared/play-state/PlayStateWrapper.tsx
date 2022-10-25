import React from 'react';
import PlayButton, { PlayButtonProps } from 'experimental/shared/play-state/PlayButton';
import PauseButton, { PauseButtonProps } from 'experimental/shared/play-state/PauseButton';
import usePlaying from 'jwplayer/utils/usePlaying';
import useAdPlaying from 'jwplayer/utils/useAdPlaying';
import styled from 'styled-components';

interface PlayStateWrapperProps {
	playConfig?: PlayButtonProps;
	pauseConfig?: PauseButtonProps;
	iconColor?: string;
	isAd?: boolean;
	className?: string;
}

export const IconWrapper = styled.div`
	cursor: pointer;
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

const PlayStateWrapper: React.FC<PlayStateWrapperProps> = ({ playConfig, pauseConfig, iconColor, isAd, className }) => {
	const isPlaying = isAd ? useAdPlaying() : usePlaying();

	return (
		<Wrapper color={iconColor} className={className}>
			{isPlaying ? (
				<PauseButton onClickCallback={pauseConfig?.onClickCallback} isAd={isAd} />
			) : (
				<PlayButton onClickCallback={playConfig?.onClickCallback} isAd={isAd} />
			)}
		</Wrapper>
	);
};

export default PlayStateWrapper;
