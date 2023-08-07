import React from 'react';
import CloseButton from 'youtube/players/shared/CloseButton';

import styles from './MobileYoutubeOffScreenOverlay.module.scss';

interface OffScreenOverlayProps {
	dismiss: () => void;
	isScrollPlayer: boolean;
}

const MobileYoutubeOffScreenOverlay: React.FC<OffScreenOverlayProps> = ({ dismiss, isScrollPlayer }) => {
	if (!isScrollPlayer) return null;

	return (
		<div className={styles.offScreenOverlayWrapper}>
			<CloseButton deviceType={'mobile'} dismiss={dismiss} />
		</div>
	);
};

export default MobileYoutubeOffScreenOverlay;
