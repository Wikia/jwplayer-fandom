import React, { useContext } from 'react';
import styled from 'styled-components';
import { CaptionsSelectListProps } from 'experimental/types';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import useCurrentCaption from 'jwplayer/utils/useCurrentCaption';

const CaptionSelectContainer = styled.div`
	position: absolute;
	bottom: 0px;
	right: 0px;
	align-items: flex-start;
	background-color: #262626;
	flex-flow: column nowrap;
	pointer-events: auto;
	height: 100%;
	width: 100%;
	background: rgb(51, 51, 51);
	z-index: 802;
	pointer-events: auto;
`;

const CaptionsList = styled.ul``;

const CaptionTrack = styled.li<{ active: boolean }>`
	${(props) => !props.active && `list-style-type: none;`}
`;

const CaptionsSelectList: React.FC<CaptionsSelectListProps> = ({ tracksList, handleClose }) => {
	const { player } = useContext(PlayerContext);
	const currentCaption = useCurrentCaption();

	const handleTrackClick = (event, newTrackIndex) => {
		event.stopPropagation();
		player.setCurrentCaptions(newTrackIndex);
		handleClose();
	};

	return (
		<CaptionSelectContainer>
			<CaptionsList>
				{tracksList.map((track, index) => {
					return (
						<CaptionTrack
							key={index}
							active={currentCaption === index}
							onClick={(event) => handleTrackClick(event, index)}
						>
							{track.label}
						</CaptionTrack>
					);
				})}
			</CaptionsList>
		</CaptionSelectContainer>
	);
};

export default CaptionsSelectList;
