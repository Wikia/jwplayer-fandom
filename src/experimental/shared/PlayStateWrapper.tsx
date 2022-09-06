import React from 'react';
import PlayButton, { PlayButtonProps } from 'experimental/shared/PlayButton';
import PauseButton, { PauseButtonProps } from 'experimental/shared/PauseButton';
import usePlaying from 'jwplayer/utils/usePlaying';

interface PlayStateWrapperProps {
	playConfig?: PlayButtonProps;
	pauseConfig?: PauseButtonProps;
}

const PlayStateWrapper: React.FC<PlayStateWrapperProps> = ({ playConfig, pauseConfig }) => {
	const isPlaying = usePlaying();

	return isPlaying ? (
		<PauseButton onClickCallback={pauseConfig?.onClickCallback} />
	) : (
		<PlayButton onClickCallback={playConfig?.onClickCallback} />
	);
};

export default PlayStateWrapper;
