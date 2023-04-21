import { DesktopScrollVideoTopContentProps } from 'experimental/types';
import React from 'react';
import useAdStarted from 'jwplayer/utils/useAdStarted';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import useAdTime from 'jwplayer/utils/useAdTime';
import CloseButton from 'jwplayer/players/shared/CloseButton';

import styles from './DesktopScrollVideoTopContent.module.css';

const DesktopScrollVideoTopContent: React.FC<DesktopScrollVideoTopContentProps> = ({
	isScrollPlayer,
	onCloseClick,
	handleClick,
}) => {
	const adStarted = useAdStarted();
	const playlistItem = usePlaylistItem();
	const adTime = useAdTime();
	let upperText = 'Now Playing';

	if (adStarted) {
		const adSeconds = Math.trunc(adTime?.duration - adTime?.position);
		const timeLabel = adSeconds === 1 ? 'second' : 'seconds';

		upperText = `Up next in ${adSeconds} ${timeLabel}`;
	}

	const lowerText = playlistItem?.title;

	if (!isScrollPlayer) return null;

	return (
		<div onClick={handleClick} className={styles.desktopScrollVideoTopContent}>
			<div className={styles.desktopScrollVideoTopWrapperTextWrapper}>
				<div className={styles.upperText}>{upperText}</div>
				<div className={styles.lowerText}>{lowerText}</div>
			</div>
			<CloseButton dismiss={onCloseClick} className={styles.closeButton} iconColor={'#333333'} />
		</div>
	);
};

export default DesktopScrollVideoTopContent;
