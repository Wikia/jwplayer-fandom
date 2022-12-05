import React from 'react';
import styled from 'styled-components';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import useAdTime from 'jwplayer/utils/useAdTime';
import PlayerFullOverlayTopText from 'experimental/shared/FullOverlay/PlayerFullOverlayTopText';
import { PlayerFullOverlayWrapper } from 'experimental/shared/FullOverlay/PlayerFullOverlayWrapper';

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	pointer-events: auto;
	height: 44px;
`;

const PlayVolumeWrapper = styled.div`
	display: flex;
`;

const PrerollPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const adTime = useAdTime();
	const adSeconds = Math.trunc(adTime?.duration - adTime?.position);
	const timeLabel = adSeconds === 1 ? 'second' : 'seconds';
	const upperText = `Up next in ${adSeconds} ${timeLabel}`;
	const lowerText = playlistItem?.title;

	return (
		<PlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<ControlWrapper>
				<PlayVolumeWrapper>
					<PlayStateWrapper iconColor={'#fff'} isAd={true} />
					<VolumeStateWrapper iconColor={'#fff'} sliderColor={'#FFC500'} hasSlider={true} hasLabel={false} />
				</PlayVolumeWrapper>
			</ControlWrapper>
		</PlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
