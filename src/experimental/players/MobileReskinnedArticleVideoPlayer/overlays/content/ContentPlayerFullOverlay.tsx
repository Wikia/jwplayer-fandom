import React from 'react';
import TimeSlider from 'experimental/shared/TimeSlider/TimeSlider';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { MobilePlayerFullOverlayWrapper } from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/shared/MobilePlayerFullOverlayWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import PlayerFullOverlayTopText from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/shared/PlayerFullOverlayTopText';
import TimeRemaining from 'experimental/shared/TimeRemaining/TimeRemaining';
import { MobileContentPlayerOverlay } from 'experimental/types';
import MobilePlayerCTAButton from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/MobilePlayerCTAButton';
import useCaptionsList from 'jwplayer/utils/useCaptionsList';
import ToggleCaptions from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ToggleCaptions';

import styles from './ContentPlayerFullOverlay.module.css';

const ContentPlayerFullOverlay: React.FC<MobileContentPlayerOverlay> = ({ resetOverlayTimeout }) => {
	const playlistItem = usePlaylistItem();
	const upperText = 'Now Playing';
	const lowerText = playlistItem?.title;
	const playPauseCallback = { onClickCallback: resetOverlayTimeout };
	const captionsList = useCaptionsList();

	return (
		<MobilePlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<PlayStateWrapper
				className={styles.playStateWrapperStyled}
				playConfig={playPauseCallback}
				pauseConfig={playPauseCallback}
				iconColor={'#fff'}
				iconSize={'32px'}
			/>
			<div className={styles.bottomWrapper}>
				<TimeSlider className={styles.contentOverlayTimeSlider} railHeight={'4px'} isMobile={true} />
				<div className={styles.controlWrapper}>
					<div className={styles.controlWrapperSection}>
						<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={false} callback={resetOverlayTimeout} />
						<TimeRemaining className={styles.timeRemaining} />
					</div>
					<div className={styles.controlWrapperSection}>
						{captionsList?.length > 1 && <ToggleCaptions resetOverlayTimeout={resetOverlayTimeout} />}
						<MobilePlayerCTAButton
							text={'Watch More'}
							onClick={() => {
								window.open(`https://www.fandom.com/video/${playlistItem.mediaid}`, '_blank');
							}}
						/>
					</div>
				</div>
			</div>
		</MobilePlayerFullOverlayWrapper>
	);
};

export default ContentPlayerFullOverlay;
