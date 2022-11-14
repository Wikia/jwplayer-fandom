import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconCrossTiny from '@fandom-frontend/react-common/dist/icons/IconCrossTiny';
import {
	trackYoutubePlayerScrollClose,
	YoutubePlayerTrackingProps,
} from 'youtube/players/shared/youtubeTrackingEvents';

const CloseWrapper = styled.div<{ topOffset?: number }>`
	cursor: pointer;
	pointer-events: initial;
	height: 36px;
	width: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.98;
	position: absolute;
	right: 0;
	top: ${(props) => (props.topOffset ? `${props.topOffset}px` : 0)};
	z-index: ${Number(WDSVariables.z7) + 1};
`;

const CrossIcon = styled(IconCrossTiny)`
	fill: ${WDSVariables.wdsColorWhite};
`;

interface CloseButtonProps extends YoutubePlayerTrackingProps {
	dismiss: () => void;
	topOffset?: number;
}

const CloseButton: React.FC<CloseButtonProps> = ({ dismiss, topOffset, deviceType }) => {
	const onClickClose = () => {
		trackYoutubePlayerScrollClose({ deviceType: deviceType });
		// player.pause();
		dismiss();
	};

	return (
		<CloseWrapper topOffset={topOffset} onClick={onClickClose}>
			<CrossIcon />
		</CloseWrapper>
	);
};

export default CloseButton;
