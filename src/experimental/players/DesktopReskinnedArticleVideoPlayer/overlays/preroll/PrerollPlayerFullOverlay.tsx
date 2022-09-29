import React from 'react';
import styled from 'styled-components';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import useAdTime from 'jwplayer/utils/useAdTime';
import LearnMoreButton from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/LearnMoreButton';
import PlayerFullOverlayTopText from 'experimental/shared/FullOverlay/PlayerFullOverlayTopText';
import { PlayerFullOverlayWrapper } from 'experimental/shared/FullOverlay/PlayerFullOverlayWrapper';

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
	const upperText = `Up next in ${adTime?.duration - adTime?.position} seconds`;
	const lowerText = playlistItem.title;

	return (
		<PlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<ControlWrapper>
				<PlayVolumeWrapper>
					<PlayStateWrapper iconColor={'#fff'} />
					<VolumeStateWrapper iconColor={'#fff'} sliderColor={'#FFC500'} hasSlider={true} hasLabel={false} />
				</PlayVolumeWrapper>
				<LearnMoreButton />
			</ControlWrapper>
		</PlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
