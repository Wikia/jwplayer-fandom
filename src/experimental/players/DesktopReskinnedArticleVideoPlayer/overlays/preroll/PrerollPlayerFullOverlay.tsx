import React from 'react';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import useAdTime from 'jwplayer/utils/useAdTime';
import PlayerFullOverlayTopText from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/shared/PlayerFullOverlayTopText';
import { DesktopPlayerFullOverlayWrapper } from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/shared/DesktopPlayerFullOverlayWrapper';

import styles from './PrerollPlayerFullOverlay.module.css';

const PrerollPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const adTime = useAdTime();
	const adSeconds = Math.trunc(adTime?.duration - adTime?.position);
	const timeLabel = adSeconds === 1 ? 'second' : 'seconds';
	const upperText = `Up next in ${adSeconds} ${timeLabel}`;
	const lowerText = playlistItem?.title;

	return (
		<DesktopPlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<div className={styles.controlWrapper}>
				<div className={styles.playVolumeWrapper}>
					<PlayStateWrapper iconColor={'#fff'} isAd={true} />
					<VolumeStateWrapper iconColor={'#fff'} sliderColor={'#FFC500'} hasSlider={true} hasLabel={false} />
				</div>
			</div>
		</DesktopPlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
