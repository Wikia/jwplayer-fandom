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

const CloseWrapper: React.FC<CloseWrapperProps> = ({ deviceType, onClick }) => {
	return (
		<div
			className={clsx(
				{ [styles.closeWrapperDesktop]: deviceType === 'desktop' },
				{ [styles.closeWrapperMobile]: deviceType === 'mobile' },
			)}
			onClick={onClick}
		>
			<IconCrossTiny className={styles.crossIcon} />
		</div>
	);
};

interface CloseButtonProps extends YoutubePlayerTrackingProps {
	dismiss: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ dismiss, deviceType }) => {
	const onClickClose = () => {
		trackYoutubePlayerScrollClose({ deviceType: deviceType });
		dismiss();
	};

	return <CloseWrapper deviceType={deviceType} onClick={onClickClose} />;
};

export default CloseButton;
