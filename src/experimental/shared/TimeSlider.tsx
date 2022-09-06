import styled from 'styled-components';
import React, { useContext } from 'react';
import useBufferUpdate from 'experimental/utils/useBufferUpdate';
import useProgressUpdate from 'experimental/utils/useProgressUpdate';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const TimeSliderWrapper = styled.div`
	z-index: 1;
	outline: 0;

	// TODO: May need to be added in as a prop, especially when using overlays etc
	height: 17px;
	width: 100%;
	align-items: center;
	background: transparent none;
	padding: 0 12px;

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

const Rail = styled.div`
	// Convert this to props in the future
	// background-color: rgba(255,255,255,.2);

	// Temporarily use white as the placeholder color for the full rail
	background-color: white;

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
	pointer-events: none;
	position: absolute;
	transform: translate(-50%, -50%) scale(0);
	transition: 150ms cubic-bezier(0, 0.25, 0.25, 1);
	transition-property: opacity, transform;
	display: none;
	top: 50%;
	transform: translate(-50%, -50%) scale(1);

	${TimeSliderWrapper}:hover & {
		display: block;
	}
`;

const TimeSlider = () => {
	const { bufferPercent } = useBufferUpdate();
	const { positionPercent, duration, position } = useProgressUpdate();
	console.log(`bufferPercent: ${bufferPercent} | positionPercent: ${positionPercent}`);

	const { player } = useContext(PlayerContext);

	const seek = (event: React.MouseEvent<HTMLDivElement>) => {
		const elementRelativePosition = event.clientX - event.currentTarget.getBoundingClientRect().left;
		console.log('Calculated position: ', elementRelativePosition);
		console.log('Video duration is: ', duration);
		console.log('Current video position: ', position);
		console.log('Current video percentage position: ', positionPercent);

		const seekTimeUpdate = (elementRelativePosition * duration) / 818;
		console.log('New seek time update should be: ', seekTimeUpdate);

		player.seek(seekTimeUpdate);
	};

	return (
		<TimeSliderWrapper>
			<TimeSliderContainer onClick={seek}>
				<Rail />
				<Buffer percentageBuffered={bufferPercent} />
				<Progress percentageProgress={positionPercent} />
				<ProgressKnob percentageProgress={positionPercent} />
			</TimeSliderContainer>
		</TimeSliderWrapper>
	);
};

export default TimeSlider;
