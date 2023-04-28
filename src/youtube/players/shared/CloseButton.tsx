import React from 'react';
import IconCrossTiny from '@fandom-frontend/react-common/dist/icons/IconCrossTiny';
import {
	trackYoutubePlayerScrollClose,
	YoutubePlayerTrackingProps,
} from 'youtube/players/shared/youtubeTrackingEvents';
import clsx from 'clsx';

import styles from './closeButton.module.scss';

interface CloseWrapperProps extends YoutubePlayerTrackingProps {
	onClick: () => void;
}

const CloseWrapper: React.FC<CloseWrapperProps> = ({ deviceType }) => (
	<div className={clsx(deviceType ? styles.closeWrapperDesktop : styles.closeWrapperMobile)} />
);

interface CloseButtonProps extends YoutubePlayerTrackingProps {
	dismiss: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ dismiss, deviceType }) => {
	const onClickClose = () => {
		trackYoutubePlayerScrollClose({ deviceType: deviceType });
		dismiss();
	};

	return (
		<CloseWrapper deviceType={deviceType} onClick={onClickClose}>
			<IconCrossTiny className={styles.crossIcon} />
		</CloseWrapper>
	);
};

export default CloseButton;
