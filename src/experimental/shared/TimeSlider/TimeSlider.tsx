import React, { useContext, useRef, useState } from 'react';
import useBufferUpdate from 'experimental/utils/useBufferUpdate';
import useProgressUpdate from 'experimental/utils/useProgressUpdate';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { TimeSliderProps } from 'experimental/types';
import { usePlayingStateRef } from 'jwplayer/utils/usePlaying';
import useStateRef from 'experimental/utils/useStateRef';

import clsx from 'clsx';

import { Rail, Buffer, Progress, ProgressKnob } from './TimeSliderComponents';
import styles from './timeSlider.module.scss';

const TimeSlider: React.FC<TimeSliderProps> = ({
	className,
	railColor,
	bufferColor,
	knobColor,
	progressColor,
	railHeight,
	canSeek = true,
	isMobile = false,
}) => {
	const { player } = useContext(PlayerContext);
	const { bufferPercent } = useBufferUpdate();
	const { positionPercent, duration } = useProgressUpdate();
	const isPlayingRef = usePlayingStateRef()[1];
	const [mouseDown, setMouseDown] = useState(false);
	const [touch, setTouch] = useState(false);
	const [dragging, setDragging, draggingRef] = useStateRef(false);
	const [dragPosition, setDragPosition] = useState(0);
	const [hover, setHover] = useState(false);
	const sliderRef = useRef<HTMLDivElement>();
	const throttleDragRef = useRef(false);
	const seekTimeoutRef = useRef(undefined);
	const wasPlaying = useRef(false);

	const seekUpdateTimeout = (elementRelativePosition) => {
		clearTimeout(seekTimeoutRef.current);
		const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
			const seekUpdate = calculateSeekUpdate(elementRelativePosition);
			player.seek(seekUpdate);
			seekTimeoutRef.current = undefined;
		}, 300);
		return timeout;
	};

	const retrieveRailWidth = () => {
		// Retrieve the width, or bring back a static approximate so that at least something work
		return sliderRef?.current?.offsetWidth ?? 818;
	};

	const limitDragPosition = (newPosition) => {
		const MIN = 0;
		const MAX = retrieveRailWidth();
		const parsed = parseInt(newPosition);
		return Math.min(Math.max(parsed, MIN), MAX);
	};

	const calculateSeekUpdate = (elementRelativePosition: number) => {
		const seekUpdate = (elementRelativePosition * duration) / retrieveRailWidth();
		if (seekUpdate < 0) return 0;
		if (seekUpdate > duration) return duration;

		return seekUpdate;
	};

	const seek = (event) => {
		event.stopPropagation();

		const clientX = event.clientX || event.changedTouches[0].clientX;
		const elementRelativePosition = clientX - sliderRef.current.getBoundingClientRect().left;
		const seekTimeUpdate = calculateSeekUpdate(elementRelativePosition);
		player.seek(seekTimeUpdate);
	};

	const onDrag = (event) => {
		event.preventDefault();

		if (!draggingRef.current) {
			wasPlaying.current = isPlayingRef.current;
			player.pause();
			setDragging(true);
		}

		if (throttleDragRef.current) return;

		throttleDragRef.current = true;
		const clientX = event.clientX || event.changedTouches[0].clientX;
		const elementRelativePosition = limitDragPosition(clientX - sliderRef.current.getBoundingClientRect().left);
		setDragPosition(elementRelativePosition);
		seekTimeoutRef.current = seekUpdateTimeout(elementRelativePosition);

		setTimeout(() => {
			throttleDragRef.current = false;
		}, 50);
	};

	const onMouseUp = () => {
		document.removeEventListener('mousemove', onDrag);
		document.removeEventListener('mouseup', onMouseUp);

		if (wasPlaying.current) {
			player.play();
		}

		setMouseDown(false);
		setDragging(false);
	};

	const onMouseDown = () => {
		setMouseDown(true);
		document.addEventListener('mousemove', onDrag);
		document.addEventListener('mouseup', onMouseUp);
	};

	const onTouchStart = (event) => {
		event.stopPropagation();
		setTouch(true);
		document.addEventListener('touchmove', onDrag);
		document.addEventListener('touchend', onTouchEnd);
	};

	const onTouchEnd = (event) => {
		event.stopPropagation();
		document.removeEventListener('touchmove', onDrag);
		document.removeEventListener('touchend', onTouchEnd);

		if (wasPlaying.current) {
			player.play();
		}

		setTouch(false);
		setDragging(false);
	};

	const handleSeek = canSeek ? seek : undefined;
	const handleMouseDown = canSeek ? onMouseDown : undefined;
	const handleTouchStart = canSeek ? onTouchStart : undefined;
	const progress = dragging ? dragPosition : positionPercent;

	const handlers = isMobile
		? {
				onTouchStart: handleTouchStart,
				onClick: handleSeek,
		  }
		: {
				onMouseEnter: () => setHover(true),
				onMouseLeave: () => setHover(false),
				onMouseDown: handleMouseDown,
				onClick: handleSeek,
		  };

	return (
		<div className={clsx(className, styles.timeSliderWrapper)} {...handlers}>
			<div className={styles.timeSliderContainer} ref={sliderRef} style={railHeight && { height: railHeight }}>
				<Rail color={railColor} />
				{canSeek && <Buffer percentageBuffered={bufferPercent} bufferBackgroundColor={bufferColor} />}
				<Progress progress={progress} dragging={dragging} progressBackgroundColor={progressColor} />
				{canSeek && (hover || mouseDown || touch) && (
					<ProgressKnob progress={progress} dragging={dragging} progressKnobColor={knobColor} />
				)}
			</div>
		</div>
	);
};

export default TimeSlider;
