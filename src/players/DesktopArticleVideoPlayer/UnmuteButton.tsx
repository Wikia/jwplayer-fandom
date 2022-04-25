import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import { PlayerContext } from 'players/shared/PlayerContext';

interface Props {
	muted: boolean;
}

const UnmuteButtonWrapper = styled.div<Props>`
	align-items: center;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 2px;
	color: ${WDSVariables.wdsColorDarkBlueGray};
	cursor: pointer;
	font-size: ${WDSVariables.wdsFontSizeXs};
	font-weight: ${WDSVariables.wdsFontWeightBold};
	max-width: 90%;
	padding: 5px 8px;
	position: absolute;
	top: 6px;
	left: 6px;
	height: 31px;
	box-sizing: border-box;
	display: flex;
`;

const StyledSoundIcon = styled(IconSoundOff)`
	fill: ${WDSVariables.wdsColorDarkBlueGray};
	flex-shrink: 0;
	height: 14px;
	margin-right: 6px;
	min-width: 14px;
	width: 14px;
`;

const UnmuteButton: React.FC = () => {
	const { player } = useContext(PlayerContext);
	const [muted, setMuted] = useState(true);
	const unmute = () => {
		player?.setMute(false);
		setMuted(false);
	};

	if (!muted) return null;

	return (
		<UnmuteButtonWrapper onClick={unmute} muted={muted}>
			<StyledSoundIcon />
			{/* TODO: use i18n */}
			Play Sound
		</UnmuteButtonWrapper>
	);
};

export default UnmuteButton;
