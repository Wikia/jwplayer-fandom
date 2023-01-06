import React, { useContext } from 'react';
import styled from 'styled-components';
import { CaptionsSelectProps } from 'experimental/types';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import useCurrentCaption from 'jwplayer/utils/useCurrentCaption';

const CaptionSelectContainer = styled.div`
	position: absolute;
	bottom: 57px;
	right: 10px;
	align-items: flex-start;
	background-color: #262626;
	flex-flow: column nowrap;
	max-width: 284px;
	pointer-events: auto;

	height: 232px;
	width: 284px;
	max-height: 232px;
	background: rgb(51, 51, 51);
`;

const CaptionsList = styled.ul``;

const CaptionTrack = styled.li<{ active: boolean }>`
	${(props) => !props.active && `list-style-type: none;`}
`;

const CaptionsSelectList: React.FC<CaptionsSelectProps> = ({ tracksList }) => {
	const { player } = useContext(PlayerContext);
	const currentCaption = useCurrentCaption();

	const setActiveTrack = (newTrackIndex) => {
		player.setCurrentCaptions(newTrackIndex);
	};

	return (
		<CaptionSelectContainer>
			<CaptionsList>
				{tracksList.map((track, index) => {
					return (
						<CaptionTrack key={index} active={currentCaption === index} onClick={() => setActiveTrack(index)}>
							{track.label}
						</CaptionTrack>
					);
				})}
			</CaptionsList>
		</CaptionSelectContainer>
	);
};

export default CaptionsSelectList;
