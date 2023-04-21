import React from 'react';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import PlayerCTAButton from 'experimental/shared/PlayerCTAButton';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';

import styles from './ContentPlayerScrollOverlay.module.css';

const ContentPlayerScrollOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();

	return (
		<>
			<div className={styles.playStateContainer}>
				<PlayStateWrapper iconColor={'#fff'} />
			</div>
			<div className={styles.bottomControls}>
				<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={true} />
				<PlayerCTAButton
					isScrollPlayer={true}
					text={'Watch More'}
					onClick={() => {
						window.open(`https://www.fandom.com/video/${playlistItem.mediaid}`, '_blank');
					}}
				/>
			</div>
			<OverlayTimeSliderBottom canSeek={false} />
		</>
	);
};

export default ContentPlayerScrollOverlay;
