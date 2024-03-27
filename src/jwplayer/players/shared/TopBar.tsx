import React from 'react';
import CloseButton from 'jwplayer/players/shared/CloseButton/CloseButton';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';

import styles from '../DesktopArticleVideoPlayer/DesktopArticleVideoPlayer.module.scss';

interface TopBarProps {
	onClickClose: () => void;
	isScrollPlayer: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onClickClose, isScrollPlayer }) => {
	return (
		<div className={styles.topBar}>
			{!isScrollPlayer && <UnmuteButton />}
			{isScrollPlayer && <CloseButton dismiss={onClickClose} iconColor={'#fff'} className={styles.closeButton} />}
		</div>
	);
};

export default TopBar;
