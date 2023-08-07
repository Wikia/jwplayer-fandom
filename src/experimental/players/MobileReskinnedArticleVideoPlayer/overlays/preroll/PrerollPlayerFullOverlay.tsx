import React from 'react';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { MobilePlayerFullOverlayWrapper } from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/shared/MobilePlayerFullOverlayWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import PlayerFullOverlayTopText from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/shared/PlayerFullOverlayTopText';
import useAdTime from 'jwplayer/utils/useAdTime';

import styles from './PrerollPlayerFullOverlay.module.css';

const PrerollPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const adTime = useAdTime();
	const adSeconds = Math.trunc(adTime?.duration - adTime?.position);
	const timeLabel = adSeconds === 1 ? 'second' : 'seconds';
	const upperText = `Up next in ${adSeconds} ${timeLabel}`;
	const lowerText = playlistItem?.title;

	return (
		<MobilePlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<div className={styles.bottomWrapper}>
				<div className={styles.controlWrapper}>
					<div className={styles.playVolumeWrapper}>
						<PlayStateWrapper className={styles.playStateWrapper} isAd={true} iconColor={'#fff'} />
						<VolumeStateWrapper
							className={styles.volumeStateWrapperStyled}
							iconColor={'#fff'}
							hasSlider={false}
							hasLabel={true}
						/>
					</div>
				</div>
			</div>
		</MobilePlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
