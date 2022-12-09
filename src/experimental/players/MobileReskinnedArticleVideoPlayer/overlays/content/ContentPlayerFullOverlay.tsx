import React from 'react';
import styled from 'styled-components';
import TimeSlider from 'experimental/shared/TimeSlider';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { MobilePlayerFullOverlayWrapper } from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/shared/MobilePlayerFullOverlayWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import PlayerFullOverlayTopText from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/shared/PlayerFullOverlayTopText';
import MobilePlayerCTAButton from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/MobilePlayerCTAButton';
import TimeRemaining from 'experimental/shared/TimeRemaining';
import { MobileContentPlayerFullOverlay } from 'experimental/types';

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

const ContentOverlayTimeSlider = styled(TimeSlider)`
	align-items: center;
	height: 25px;
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const TimeRemainingPadded = styled(TimeRemaining)`
	padding-left: 10px;
	font-size: 13px;
`;

const PlayStateWrapperStyled = styled(PlayStateWrapper)`
	align-self: center;
`;

const ContentPlayerFullOverlay: React.FC<MobileContentPlayerFullOverlay> = ({ resetOverlayTimeout }) => {
	const playlistItem = usePlaylistItem();
	const upperText = 'Now Playing';
	const lowerText = playlistItem?.title;
	const playPauseCallback = { onClickCallback: resetOverlayTimeout };

	return (
		<MobilePlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<PlayStateWrapperStyled playConfig={playPauseCallback} pauseConfig={playPauseCallback} iconColor={'#fff'} />
			<BottomWrapper>
				<ContentOverlayTimeSlider railHeight={'4px'} isMobile={true} />
				<ControlWrapper>
					<PlayVolumeWrapper>
						<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={false} callback={resetOverlayTimeout} />
						<TimeRemainingPadded />
					</PlayVolumeWrapper>
					<MobilePlayerCTAButton
						text={'Watch More'}
						onClick={() => {
							window.open(`https://www.fandom.com/video/${playlistItem.mediaid}`, '_blank');
						}}
					/>
				</ControlWrapper>
			</BottomWrapper>
		</MobilePlayerFullOverlayWrapper>
	);
};

export default ContentPlayerFullOverlay;
