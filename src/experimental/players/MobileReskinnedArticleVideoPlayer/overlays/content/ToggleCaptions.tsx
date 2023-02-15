import React, { useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import styled from 'styled-components';
import IconBubble from '@fandom-frontend/react-common/dist/icons/IconBubble';
import useCurrentCaption from 'jwplayer/utils/useCurrentCaption';
import { ToggleCaptionsProps } from 'experimental/types';

const StyledIconBubble = styled(IconBubble)<{ isActive: boolean }>`
	fill: #fff;
	opacity: ${(props) => (props.isActive ? '1' : '.5')};
	flex-shrink: 0;
	height: 14px;
	margin-right: 6px;
	min-width: 14px;
	width: 14px;
`;

const IconWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ToggleCaptions: React.FC<ToggleCaptionsProps> = ({ resetOverlayTimeout }) => {
	const currentCaption = useCurrentCaption();
	const { player } = useContext(PlayerContext);

	const handleToggleCaptions = (event) => {
		event.stopPropagation();
		currentCaption === 0 ? player.setCurrentCaptions(1) : player.setCurrentCaptions(0);
		resetOverlayTimeout();
	};

	return (
		<IconWrapper onClick={handleToggleCaptions}>
			<StyledIconBubble isActive={currentCaption === 1} />
		</IconWrapper>
	);
};

export default ToggleCaptions;
