import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconCrossTiny from '@fandom-frontend/react-common/dist/icons/IconCrossTiny';
import { VimeoArticleVideoPlayerTrackingProps } from 'vimeo/types';

const CloseWrapper = styled.div<VimeoArticleVideoPlayerTrackingProps>`
	cursor: pointer;
	pointer-events: initial;
	height: ${(props) => (props.deviceType === 'desktop' ? '24px' : '36px')};
	width: ${(props) => (props.deviceType === 'desktop' ? '24px' : '36px')};
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.98;
	position: absolute;
	right: -3px;
	right: ${(props) => (props.deviceType === 'desktop' ? '-3px' : '-6px')};
	top: -3px;
	z-index: ${Number(WDSVariables.z7) + 1};
`;

const CrossIcon = styled(IconCrossTiny)`
	fill: ${WDSVariables.wdsColorWhite};
`;

interface CloseButtonProps extends VimeoArticleVideoPlayerTrackingProps {
	dismiss: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ dismiss, deviceType }) => {
	const onClickClose = () => {
		dismiss();
	};

	return (
		<CloseWrapper deviceType={deviceType} onClick={onClickClose}>
			<CrossIcon />
		</CloseWrapper>
	);
};

export default CloseButton;
