import React, { useContext } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconCrossTiny from '@fandom-frontend/react-common/dist/icons/IconCrossTiny';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { jwPlayerPlaybackTracker } from 'jwplayer/utils/videoTracking';

const CloseWrapper = styled.div`
	cursor: pointer;
	pointer-events: initial;
	height: 36px;
	width: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.98;
	z-index: ${Number(WDSVariables.z7) + 1};
`;

interface CloseButtonProps {
	className?: string;
	dismiss: () => void;
	iconColor?: string;
	iconSize?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, dismiss, iconColor, iconSize }) => {
	const { player } = useContext(PlayerContext);
	const onClickClose = (event) => {
		event.stopPropagation();
		jwPlayerPlaybackTracker({ event_name: 'video_player_close' });
		player.pause();
		dismiss();
	};

	return (
		<CloseWrapper className={className} onClick={onClickClose}>
			<IconCrossTiny fill={iconColor} width={iconSize || '1em'} height={iconSize || '1em'} />
		</CloseWrapper>
	);
};

export default CloseButton;
