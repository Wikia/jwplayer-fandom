import React from 'react';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';

import styles from './prerollPlayerScrollOverlay.module.css';

const PrerollPlayerScrollOverlay: React.FC = () => {
	return (
		<>
			<div className={styles.playStateContainer}>
				<PlayStateWrapper iconColor={'#fff'} isAd={true} className={styles.playStateWrapperClickable} />
			</div>
			<div className={styles.bottomControls}>
				<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={true} />
			</div>
		</>
	);
};

export default PrerollPlayerScrollOverlay;
