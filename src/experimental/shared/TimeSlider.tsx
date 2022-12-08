import styled from 'styled-components';
import React, { useContext, useRef, useState } from 'react';
import useBufferUpdate from 'experimental/utils/useBufferUpdate';
import useProgressUpdate from 'experimental/utils/useProgressUpdate';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import { TimeSliderProps } from 'experimental/types';
import { usePlayingStateRef } from 'jwplayer/utils/usePlaying';
import useStateRef from 'experimental/utils/useStateRef';

const TimeSliderWrapper = styled.div`
	z-index: ${Number(WDSVariables.z8) + 1};
	outline: 0;

	// TODO: May need to be added in as a prop, especially when using overlays etc
	height: 5px;
	width: 100%;
	background: transparent none;

	// Horizontal class styles
	display: flex;

	cursor: pointer;
`;

interface TimeSliderContainerProps {
	height: string;
}

const TimeSliderContainer = styled.div<TimeSliderContainerProps>`
	height: ${(props) => (props.height ? props.height : '5px')};
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	touch-action: none;
`;

interface RailProps {
	railBackgroundColor?: string;
}

const Rail = styled.div<RailProps>`
	// Convert this to props in the future
	background-color: ${(props) => (props.railBackgroundColor ? props.railBackgroundColor : `rgba(255, 255, 255, 0.2)`)};

	// Temporarily use white as the placeholder color for the full rail
	//background-color: white;

	width: 100%;
	height: 100%;
	position: absolute;
	cursor: pointer;
`;

interface BufferProps {
	percentageBuffered: number;
	bufferBackgroundColor?: string;
}

const Buffer = styled.div<BufferProps>`
	width: ${(props) => props.percentageBuffered}%;
	height: 100%;
	position: absolute;
	cursor: pointer;
	background-color: ${(props) =>
		props.bufferBackgroundColor ? props.bufferBackgroundColor : `rgba(0, 214, 214, 0.5)`};
`;

interface ProgressProps {
	progress: number;
	dragging: boolean;
	progressBackgroundColor?: string;
}

const Progress = styled.div<ProgressProps>`
	width: ${(props) => (props.dragging ? `${props.progress}px` : `${props.progress}%`)};
	height: 100%;
	position: absolute;
	cursor: pointer;
	background-color: ${(props) => (props.progressBackgroundColor ? props.progressBackgroundColor : `rgb(0, 214, 214)`)};
`;

interface ProgressKnobProps {
	progress: number;
	dragging: boolean;
	progressKnobColor?: string;
}

const ProgressKnob = styled.div<ProgressKnobProps>`
	left: ${(props) => (props.dragging ? `${props.progress}px` : `${props.progress}%`)};
	height: 13px;
	width: 13px;
	background-color: rgb(0, 214, 214);
	border-radius: 50%;
	box-shadow: 0 0 10px rgb(0 0 0 / 40%);
	opacity: 1;
	position: absolute;
`;

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
		<TimeSliderWrapper className={className} {...handlers}>
			<TimeSliderContainer ref={sliderRef} height={railHeight}>
				<Rail color={railColor} />
				{canSeek && <Buffer percentageBuffered={bufferPercent} bufferBackgroundColor={bufferColor} />}
				<Progress progress={progress} dragging={dragging} progressBackgroundColor={progressColor} />
				{canSeek && (hover || mouseDown || touch) && (
					<ProgressKnob progress={progress} dragging={dragging} progressKnobColor={knobColor} />
				)}
			</TimeSliderContainer>
		</TimeSliderWrapper>
	);
};

export default TimeSlider;
