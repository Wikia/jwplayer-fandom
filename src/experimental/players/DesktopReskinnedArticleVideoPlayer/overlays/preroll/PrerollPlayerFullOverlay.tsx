import React from 'react';
import styled from 'styled-components';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
// import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import useAdTime from 'jwplayer/utils/useAdTime';

const PrerollPlayerFullOverlayWrapper = styled.div`
	padding: 20px;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
`;

const TextWrapper = styled.div``;
const UpperText = styled.h2``;
const LowerText = styled.h1``;

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
`;
const PrerollPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const adTime = useAdTime();

	return (
		<PrerollPlayerFullOverlayWrapper>
			<TextWrapper>
				<UpperText>Up next in {adTime?.duration - adTime?.position} seconds</UpperText>
				<LowerText>{playlistItem.title}</LowerText>
			</TextWrapper>
			<ControlWrapper>
				<PlayStateWrapper iconColor={'#fff'} />
				{/* <VolumeStateWrapper /> */}
			</ControlWrapper>
		</PrerollPlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
