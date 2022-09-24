import React, { useRef, useContext } from 'react';
import useVolume from 'jwplayer/utils/useVolume';
import styled from 'styled-components';
import useMute from 'jwplayer/utils/useMute';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const SliderWrapper = styled.div`
	background-color: transparent;
	align-items: center;
	flex-direction: column;
	display: flex;
`;
const SliderContainer = styled.div`
	background-color: transparent;
	height: 88px;
	width: 5px;
	display: flex;
	align-items: center;
	position: relative;
	touch-action: none;
`;
const SliderRail = styled.div`
	height: 100%;
	width: 5px;
	transform: translate(-50%, 0);
	transition: transform 150ms ease-in-out;
	bottom: 0;
	position: absolute;
	cursor: pointer;
	background: rgba(255, 255, 255, 0.3);
	left: 50%;
`;

const SliderBuffer = styled.div`
	background-color: rgba(0, 214, 214, 0.5);
	height: 100%;
	width: 5px;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	transform: translate(-50%, 0);
	transition: transform 150ms ease-in-out;
	bottom: 0;
	left: 50%;
	position: absolute;
	cursor: pointer;
	background: rgba(255, 255, 255, 0.3);
`;

const SliderProgress = styled.div<{ volume: number; mute: boolean }>`
	background-color: rgb(0, 214, 214);
	height: ${(props) => (props.mute ? '0' : props.volume)}%;
	width: 5px;
	backface-visibility: hidden;
	transform: translate(-50%, 0);
	transition: transform 150ms ease-in-out;
	bottom: 0;
	position: absolute;
	cursor: pointer;
	left: 50%;
`;

const SliderKnob = styled.div<{ volume: number; mute: boolean }>`
	height: 13px;
	width: 13px;
	background-color: #fff;
	border-radius: 50%;
	box-shadow: 0 0 10px rgb(0 0 0 / 40%);
	opacity: 1;
	pointer-events: none;
	position: absolute;
	transform: translate(-50%, -50%) scale(0);
	transition: 150ms cubic-bezier(0, 0.25, 0.25, 1);
	transition-property: opacity, transform;
	transform: translate(-50%, 50%);
	background-color: rgb(0, 214, 214);
	transform: translate(-50%, 50%);
	left: 50%;
	bottom: ${(props) => (props.mute ? '0' : props.volume)}%;
	color: rgba(255, 255, 255, 0.8);
`;

const VolumeSlider: React.FC = () => {
	const { player } = useContext(PlayerContext);
	const volume = useVolume();
	const mute = useMute();
	const sliderRef = useRef<HTMLDivElement>();

	const onSliderMouseDown = (event) => {
		const newVol = getSliderPercent(event);
		player.setVolume(newVol);
		sliderRef.current.addEventListener('mousemove', onMoveSlider);
	};

	const onSliderMouseUp = () => {
		sliderRef.current.removeEventListener('mousemove', onMoveSlider);
	};

	const onMoveSlider = (event) => {
		const newVol = getSliderPercent(event);
		player.setVolume(newVol);
	};

	const getSliderPercent = (event) => {
		const sliderDiff = event.currentTarget.getBoundingClientRect().bottom - event.clientY;
		const sliderHeight = 88; // TODO: move this
		const calcPercent = (sliderDiff / sliderHeight) * 100;
		return calcPercent;
	};

	return (
		<SliderWrapper>
			<SliderContainer>
				<SliderRail />
				<SliderBuffer onMouseDown={onSliderMouseDown} onMouseUp={onSliderMouseUp} ref={sliderRef} />
				<SliderProgress mute={mute} volume={volume} />
				<SliderKnob mute={mute} volume={volume} />
			</SliderContainer>
		</SliderWrapper>
	);
};

export default VolumeSlider;
