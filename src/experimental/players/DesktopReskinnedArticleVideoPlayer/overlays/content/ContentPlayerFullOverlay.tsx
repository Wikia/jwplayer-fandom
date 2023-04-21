import React from 'react';
import TimeSlider from 'experimental/shared/TimeSlider';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { DesktopPlayerFullOverlayWrapper } from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/shared/DesktopPlayerFullOverlayWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import PlayerFullOverlayTopText from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/shared/PlayerFullOverlayTopText';
import PlayerCTAButton from 'experimental/shared/PlayerCTAButton';
import TimeRemaining from 'experimental/shared/TimeRemaining';

import styles from './ContentPlayerFullOverlay.module.css';

const ContentPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const upperText = 'Now Playing';
	const lowerText = playlistItem?.title;

	return (
		<DesktopPlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<div className={styles.bottomWrapper}>
				<TimeSlider railHeight={'2px'} className={styles.contentOverlayTimeSlider} />
				<div className={styles.controlWrapper}>
					<div className={styles.playVolumeWrapper}>
						<PlayStateWrapper iconColor={'#fff'} />
						<VolumeStateWrapper iconColor={'#fff'} hasLabel={false} hasSlider={true} />
						<TimeRemaining className={styles.timeRemainingPadded} />
					</div>
					<PlayerCTAButton
						text={'Watch More'}
						onClick={() => {
							window.open(`https://www.fandom.com/video/${playlistItem.mediaid}`, '_blank');
						}}
					/>
				</div>
			</div>
		</DesktopPlayerFullOverlayWrapper>
	);
};

export default ContentPlayerFullOverlay;
