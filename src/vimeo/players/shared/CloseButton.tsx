import React from 'react';
import clsx from 'clsx';

import { VimeoArticleVideoPlayerTrackingProps } from 'vimeo/types';
import IconCrossTiny from '@fandom-frontend/react-common/dist/icons/IconCrossTiny';

import styles from './CloseButton.module.css';

interface CloseButtonProps extends VimeoArticleVideoPlayerTrackingProps {
	dismiss: () => void;
}

interface CloseWrapperProps extends VimeoArticleVideoPlayerTrackingProps {
	onClick: () => void;
}

const CloseWrapper: React.FC<CloseWrapperProps> = ({ deviceType }) => (
	<div className={clsx(deviceType ? styles.closeWrapperDesktop : styles.closeWrapperMobile)} />
);

const CloseButton: React.FC<CloseButtonProps> = ({ dismiss, deviceType }) => {
	return (
		<CloseWrapper deviceType={deviceType} onClick={dismiss}>
			<IconCrossTiny className={styles.crossIcon} />
		</CloseWrapper>
	);
};

export default CloseButton;
