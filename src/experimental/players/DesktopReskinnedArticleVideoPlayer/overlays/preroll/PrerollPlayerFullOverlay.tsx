import React from 'react';
import styled from 'styled-components';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import useAdTime from 'jwplayer/utils/useAdTime';
import LearnMoreButton from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/LearnMoreButton';

const PrerollPlayerFullOverlayWrapper = styled.div`
	padding: 35px 56px 35px 56px;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
`;

const TextWrapper = styled.div`
	color: #eee;
`;
const UpperText = styled.div`
	font-weight: 400;
	font-size: 14px;
	margin-bottom: 5px;
`;
const LowerText = styled.div`
	font-weight: 400;
	font-size: 20px;
`;

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const PlayVolumeWrapper = styled.div`
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
				<PlayVolumeWrapper>
					<PlayStateWrapper iconColor={'#fff'} />
					<VolumeStateWrapper hasSlider={true} />
				</PlayVolumeWrapper>
				<LearnMoreButton />
			</ControlWrapper>
		</PrerollPlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
