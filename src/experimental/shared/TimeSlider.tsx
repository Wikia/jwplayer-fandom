import styled from 'styled-components';
import React, { useContext, useRef } from 'react';
import useBufferUpdate from 'experimental/utils/useBufferUpdate';
import useProgressUpdate from 'experimental/utils/useProgressUpdate';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import { TimeSliderProps } from 'experimental/types';

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
	display: none;

	${TimeSliderWrapper}:hover & {
		display: block;
	}
`;

const TimeSlider: React.FC<TimeSliderProps> = ({
	className,
	interactive = true,
	railColor,
	bufferColor,
	knobColor,
	progressColor,
}) => {
	const { bufferPercent } = useBufferUpdate();
	const { positionPercent, duration } = useProgressUpdate();
	const sliderRef = useRef<HTMLDivElement>();

	const { player } = useContext(PlayerContext);

	const retrieveRailWidth = () => {
		// Retrieve the width, or bring back a static approximate so that at least something work
		return sliderRef?.current?.offsetWidth ?? 818;
	};

	const calculateSeekUpdate = (elementRelativePosition: number) => {
		return (elementRelativePosition * duration) / retrieveRailWidth();
	};

	const seek = (event: React.MouseEvent<HTMLDivElement>) => {
		const elementRelativePosition = event.clientX - event.currentTarget.getBoundingClientRect().left;
		const seekTimeUpdate = calculateSeekUpdate(elementRelativePosition);
		player.seek(seekTimeUpdate);
	};

	const onMouseMove = (event) => {
		event.preventDefault();
		const elementRelativePosition = event.clientX - sliderRef.current.getBoundingClientRect().left;
		const seekUpdate = calculateSeekUpdate(elementRelativePosition);
		player.seek(seekUpdate);
	};

	const onMouseUp = () => {
		sliderRef.current.removeEventListener('mousemove', onMouseMove);
		sliderRef.current.removeEventListener('mouseup', onMouseUp);
		player.play();
	};

	const onMouseDown = (event) => {
		event.preventDefault();
		player.pause();

		sliderRef.current.addEventListener('mousemove', onMouseMove);
		sliderRef.current.addEventListener('mouseup', onMouseUp);
	};

	const handleSeek = interactive ? seek : null;

	return (
		<TimeSliderWrapper className={className}>
			<TimeSliderContainer ref={sliderRef} onClick={handleSeek}>
				<Rail color={railColor} />
				{interactive && <Buffer percentageBuffered={bufferPercent} bufferBackgroundColor={bufferColor} />}
				<Progress percentageProgress={positionPercent} progressBackgroundColor={progressColor} />
				{interactive && (
					<ProgressKnob onMouseDown={onMouseDown} percentageProgress={positionPercent} progressKnobColor={knobColor} />
				)}
			</TimeSliderContainer>
		</TimeSliderWrapper>
	);
};

export default TimeSlider;
