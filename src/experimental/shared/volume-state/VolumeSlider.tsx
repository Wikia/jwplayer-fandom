import React, { useRef, useContext, useState } from 'react';
import useVolume from 'jwplayer/utils/useVolume';
import styled from 'styled-components';
import useMute from 'jwplayer/utils/useMute';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { VolumeSliderProps } from 'experimental/types';

const SliderOverlay = styled.div`
	position: absolute;
	bottom: 100%;
	width: 44px;
	background-color: transparent;
	float: none;
	vertical-align: baseline;
	z-index: 802;
`;

const SliderWrapper = styled.div`
	padding: 13px 0 26px;
	align-items: center;
	flex-direction: column;
	display: flex;
	background-color: transparent;
	vertical-align: baseline;
`;
const SliderContainer = styled.div`
	background-color: transparent;
	height: 88px;
	width: 5px;
	display: flex;
	align-items: center;
	position: relative;
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

const SliderProgress = styled.div<{ volume: number; mute: boolean; color: string }>`
	background-color: ${(props) => props.color};
	height: ${(props) => (props.mute ? '0' : props.volume)}%;
	width: 5px;
	backface-visibility: hidden;
	transform: translate(-50%, 0);
	transition: transform 150ms ease-in-out;
	bottom: 0;
	position: absolute;
	cursor: pointer;
	left: 50%;
	pointer-events: none;
`;

const SliderKnob = styled.div<{ volume: number; mute: boolean; color: string }>`
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
	background-color: ${(props) => props.color};
	transform: translate(-50%, 50%);
	left: 50%;
	bottom: ${(props) => (props.mute ? '0' : props.volume)}%;
	color: rgba(255, 255, 255, 0.8);
`;

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
		const calcPercent = (sliderDiff / sliderHeight) * 100;

		return calcPercent;
	};

	if (!(hover || mouseDown)) return null;

	return (
		<SliderOverlay
			onClick={(event) => {
				event.stopPropagation();
			}}
			onMouseDown={onSliderMouseDown}
		>
			<SliderWrapper>
				<SliderContainer ref={sliderRef}>
					<SliderRail />
					<SliderBuffer />
					<SliderProgress mute={mute} volume={volume} color={color} />
					<SliderKnob mute={mute} volume={volume} color={color} />
				</SliderContainer>
			</SliderWrapper>
		</SliderOverlay>
	);
};

export default VolumeSlider;
