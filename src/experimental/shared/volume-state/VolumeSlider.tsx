import React, { useContext, useRef, useState } from 'react';
import useVolume from 'jwplayer/utils/useVolume';
import useMute from 'jwplayer/utils/useMute';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { VolumeSliderProps } from 'experimental/types';

import styles from './VolumeSlider.module.css';

const VolumeSlider: React.FC<VolumeSliderProps> = ({ hover, color }) => {
	const { player } = useContext(PlayerContext);
	const volume = useVolume();
	const mute = useMute();
	const sliderRef = useRef<HTMLDivElement>();
	const [mouseDown, setMouseDown] = useState(false);

	const onSliderMouseDown = (event) => {
		const newVol = getSliderPercent(event);
		player.setVolume(newVol);
		setMouseDown(true);
		document.addEventListener('mousemove', onMoveSlider);
		document.addEventListener('mouseup', onSliderMouseUp);
	};

	const onSliderMouseUp = () => {
		document.removeEventListener('mousemove', onMoveSlider);
		document.removeEventListener('mouseup', onSliderMouseUp);
		setMouseDown(false);
	};

	const onMoveSlider = (event) => {
		const newVol = getSliderPercent(event);
		player.setVolume(newVol);
	};

	const getSliderPercent = (event) => {
		const sliderDiff = sliderRef?.current?.getBoundingClientRect().bottom - event.clientY;
		const sliderHeight = 88; // TODO: move this
		return (sliderDiff / sliderHeight) * 100;
	};

	if (!(hover || mouseDown)) return null;

	return (
		<div
			className={styles.sliderOverlay}
			onClick={(event) => {
				event.stopPropagation();
			}}
			onMouseDown={onSliderMouseDown}
		>
			<div className={styles.sliderWrapper}>
				<div className={styles.sliderContainer} ref={sliderRef}>
					<div className={styles.sliderRail} />
					<div className={styles.sliderBuffer} />
					<div
						className={styles.sliderProgress}
						style={{
							backgroundColor: color,
							height: mute ? 0 : `${volume}%`,
						}}
						color={color}
					/>
					<div
						className={styles.sliderKnob}
						style={{
							backgroundColor: color,
							bottom: mute ? 0 : `${volume}%`,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default VolumeSlider;
