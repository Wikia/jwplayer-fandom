import React from 'react';
import styled from 'styled-components';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { MobilePlayerFullOverlayWrapper } from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/shared/MobilePlayerFullOverlayWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import PlayerFullOverlayTopText from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/shared/PlayerFullOverlayTopText';
import useAdTime from 'jwplayer/utils/useAdTime';

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const PlayVolumeWrapper = styled.div`
	display: flex;
	position: relative;
	left: -15px;
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
const PlayStateWrapperStyled = styled(PlayStateWrapper)`
	align-self: center;
`;

const PrerollPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const adTime = useAdTime();
	const adSeconds = Math.trunc(adTime?.duration - adTime?.position);
	const timeLabel = adSeconds === 1 ? 'second' : 'seconds';
	const upperText = `Up next in ${adSeconds} ${timeLabel}`;
	const lowerText = playlistItem?.title;

	return (
		<MobilePlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<PlayStateWrapperStyled iconColor={'#fff'} />
			<BottomWrapper>
				<ControlWrapper>
					<PlayVolumeWrapper>
						<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={true} />
					</PlayVolumeWrapper>
				</ControlWrapper>
			</BottomWrapper>
		</MobilePlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
