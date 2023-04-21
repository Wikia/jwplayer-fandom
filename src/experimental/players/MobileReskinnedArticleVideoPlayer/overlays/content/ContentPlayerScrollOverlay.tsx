import React from 'react';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { MobileContentPlayerOverlay } from 'experimental/types';

import styles from './ContentPlayerScrollOverlay.module.css';

const ContentPlayerScrollOverlay: React.FC<MobileContentPlayerOverlay> = ({ resetOverlayTimeout }) => {
	const playPauseCallback = { onClickCallback: resetOverlayTimeout };

	return (
		<div className={styles.scrollOverlayWrapper}>
			<div className={styles.playPauseWrapper}>
				<PlayStateWrapper
					playConfig={playPauseCallback}
					pauseConfig={playPauseCallback}
					iconColor={'#fff'}
					iconSize={'32px'}
				/>
				<VolumeStateWrapper
					iconColor={'#fff'}
					hasSlider={false}
					hasLabel={false}
					callback={resetOverlayTimeout}
					iconSize={'32px'}
				/>
			</div>
			<OverlayTimeSliderBottom canSeek={false} />
		</div>
	);
};

export default ContentPlayerScrollOverlay;
