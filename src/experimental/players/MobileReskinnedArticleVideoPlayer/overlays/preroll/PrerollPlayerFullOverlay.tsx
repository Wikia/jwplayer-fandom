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
	pointer-events: auto;
	display: flex;
	position: relative;
	left: -15px;
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const PlayStateWrapperStyled = styled(PlayStateWrapper)`
	filter: drop-shadow(0 0 3px #000);
`;

const VolumeStateWrapperStyled = styled(VolumeStateWrapper)`
	filter: drop-shadow(0 0 3px #000);
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
			<BottomWrapper>
				<ControlWrapper>
					<PlayVolumeWrapper>
						<PlayStateWrapperStyled isAd={true} iconColor={'#fff'} />
						<VolumeStateWrapperStyled iconColor={'#fff'} hasSlider={false} hasLabel={true} />
					</PlayVolumeWrapper>
				</ControlWrapper>
			</BottomWrapper>
		</MobilePlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
