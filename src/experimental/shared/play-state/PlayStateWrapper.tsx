import React from 'react';
import PlayButton from 'experimental/shared/play-state/PlayButton';
import PauseButton from 'experimental/shared/play-state/PauseButton';
import { PlayStateWrapperProps } from 'experimental/types';
import usePlaying from 'jwplayer/utils/usePlaying';
import useAdPlaying from 'jwplayer/utils/useAdPlaying';

import clsx from 'clsx';

import styles from './playStateWrapper.module.scss';

interface IconWrapperProps {
	onClick: () => void;
}

export const IconWrapper: React.FC<IconWrapperProps> = () => <div className={styles.iconWrapper} />;

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
		<div className={clsx(className, styles.wrapper)} style={{ ...(iconColor && { color: iconColor }) }}>
			{isPlaying ? (
				<PauseButton onClickCallback={pauseConfig?.onClickCallback} isAd={isAd} iconSize={iconSize} />
			) : (
				<PlayButton onClickCallback={playConfig?.onClickCallback} isAd={isAd} iconSize={iconSize} />
			)}
		</div>
	);
};

export default PlayStateWrapper;
