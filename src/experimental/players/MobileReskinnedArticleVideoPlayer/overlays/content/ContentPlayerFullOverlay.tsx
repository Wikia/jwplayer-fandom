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
import { MobileContentPlayerOverlay } from 'experimental/types';
import useCaptionsList from 'jwplayer/utils/useCaptionsList';
import ToggleCaptions from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ToggleCaptions';

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const ControlWrapperSection = styled.div`
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

const ContentPlayerFullOverlay: React.FC<MobileContentPlayerOverlay> = ({ resetOverlayTimeout }) => {
	const playlistItem = usePlaylistItem();
	const upperText = 'Now Playing';
	const lowerText = playlistItem?.title;
	const playPauseCallback = { onClickCallback: resetOverlayTimeout };
	const captionsList = useCaptionsList();

	return (
		<MobilePlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<PlayStateWrapperStyled
				playConfig={playPauseCallback}
				pauseConfig={playPauseCallback}
				iconColor={'#fff'}
				iconSize={'32px'}
			/>
			<BottomWrapper>
				<ContentOverlayTimeSlider railHeight={'4px'} isMobile={true} />
				<ControlWrapper>
					<ControlWrapperSection>
						<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={false} callback={resetOverlayTimeout} />
						<TimeRemainingPadded />
					</ControlWrapperSection>
					<ControlWrapperSection>
						{captionsList?.length > 1 && <ToggleCaptions resetOverlayTimeout={resetOverlayTimeout} />}
						<MobilePlayerCTAButton
							text={'Watch More'}
							onClick={() => {
								window.open(`https://www.fandom.com/video/${playlistItem.mediaid}`, '_blank');
							}}
						/>
					</ControlWrapperSection>
				</ControlWrapper>
			</BottomWrapper>
		</MobilePlayerFullOverlayWrapper>
	);
};

export default ContentPlayerFullOverlay;
