import styled from 'styled-components';
import React, { useContext, useRef, useState } from 'react';
import useBufferUpdate from 'experimental/utils/useBufferUpdate';
import useProgressUpdate from 'experimental/utils/useProgressUpdate';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import { TimeSliderProps } from 'experimental/types';
import useAdPlaying from 'jwplayer/utils/useAdPlaying';
import usePlaying from 'jwplayer/utils/usePlaying';

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

const TimeSliderContainer = styled.div`
	height: 5px;
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
	percentageProgress: number;
	progressBackgroundColor?: string;
}

const Progress = styled.div<ProgressProps>`
	width: ${(props) => props.percentageProgress}%;
	height: 100%;
	position: absolute;
	cursor: pointer;
	background-color: ${(props) => (props.progressBackgroundColor ? props.progressBackgroundColor : `rgb(0, 214, 214)`)};
`;

interface ProgressKnobProps {
	percentageProgress: number;
	progressKnobColor?: string;
}

const ProgressKnob = styled.div<ProgressKnobProps>`
	left: ${(props) => props.percentageProgress}%;
	height: 13px;
	width: 13px;
	background-color: rgb(0, 214, 214);
	border-radius: 50%;
	box-shadow: 0 0 10px rgb(0 0 0 / 40%);
	opacity: 1;
	position: absolute;
`;

const TimeSlider: React.FC<TimeSliderProps> = ({ className, railColor, bufferColor, knobColor, progressColor }) => {
	const { player } = useContext(PlayerContext);
	const { bufferPercent } = useBufferUpdate();
	const { positionPercent, duration } = useProgressUpdate();
	const isPlaying = usePlaying();
	const [seekTimeout, setSeekTimeout] = useState(undefined);
	const [mouseDown, setMouseDown] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [dragPosition, setDragPosition] = useState(0);
	const [throttleDrag, setThrottleDrag] = useState(false);
	const [wasPlaying, setWasPlaying] = useState(false);
	const [hover, setHover] = useState(false);
	const sliderRef = useRef<HTMLDivElement>();

	const seekUpdateTimeout = (seekUpdate) => {
		clearTimeout(seekTimeout);
		const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
			player.seek(seekUpdate);
			setSeekTimeout(undefined);
		}, 400);
		return timeout;
	};

	const retrieveRailWidth = () => {
		// Retrieve the width, or bring back a static approximate so that at least something work
		return sliderRef?.current?.offsetWidth ?? 818;
	};

	const calculateSeekUpdate = (elementRelativePosition: number) => {
		const seekUpdate = (elementRelativePosition * duration) / retrieveRailWidth();
		if (seekUpdate < 0) return 0;
		if (seekUpdate > duration) return duration;

		return seekUpdate;
	};

	const seek = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const elementRelativePosition = event.clientX - sliderRef.current.getBoundingClientRect().left;
		const seekTimeUpdate = calculateSeekUpdate(elementRelativePosition);
		player.seek(seekTimeUpdate);
	};

	const onMouseMove = (event) => {
		event.preventDefault();

		if (!dragging) {
			setWasPlaying(isPlaying);
			player.pause();
			setDragging(true);
		}

		if (throttleDrag) return;
		setThrottleDrag(true);

		const elementRelativePosition = event.clientX - sliderRef.current.getBoundingClientRect().left;
		const seekUpdate = calculateSeekUpdate(elementRelativePosition);
		const newDragPosition = (seekUpdate / duration) * 100;

		setDragPosition(newDragPosition);

		setTimeout(function () {
			setSeekTimeout(seekUpdateTimeout(seekUpdate));
			setThrottleDrag(false);
		}, 200);
	};

	const onMouseUp = () => {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);

		if (wasPlaying) {
			player.play();
		}

		setMouseDown(false);
		setDragging(false);
	};

	const onMouseDown = () => {
		setMouseDown(true);
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	};

	const adPlaying = useAdPlaying();
	const handleSeek = adPlaying ? (event) => event.stopPropagation() : seek;
	const progress = dragging ? dragPosition : positionPercent;

	return (
		<TimeSliderWrapper className={className} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			<TimeSliderContainer ref={sliderRef} onMouseDown={onMouseDown} onClick={handleSeek}>
				<Rail color={railColor} />
				{!adPlaying && <Buffer percentageBuffered={bufferPercent} bufferBackgroundColor={bufferColor} />}
				<Progress percentageProgress={progress} progressBackgroundColor={progressColor} />
				{!adPlaying && (hover || mouseDown) && (
					<ProgressKnob percentageProgress={progress} progressKnobColor={knobColor} />
				)}
			</TimeSliderContainer>
		</TimeSliderWrapper>
	);
};

export default TimeSlider;
