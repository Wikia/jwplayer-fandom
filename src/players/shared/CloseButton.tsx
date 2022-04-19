import React, { useContext } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconCrossTiny from '@fandom-frontend/react-common/dist/icons/IconCrossTiny';
import { PlayerContext } from 'players/shared/PlayerContext';

const CloseWrapper = styled.div`
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
	top: 0;
	z-index: 2;
`;

const CrossIcon = styled(IconCrossTiny)`
	fill: ${WDSVariables.wdsColorWhite};
`;

interface CloseButtonProps {
	dismiss: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ dismiss }) => {
	const { player } = useContext(PlayerContext);
	const onClickClose = () => {
		player.pause();
		dismiss();
	};

	return (
		<CloseWrapper onClick={onClickClose}>
			<CrossIcon />
		</CloseWrapper>
	);
};

export default CloseButton;