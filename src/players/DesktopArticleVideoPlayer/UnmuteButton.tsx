import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import { PlayerContext } from 'players/shared/PlayerContext';

interface Props {
	muted: boolean;
}

const UnmuteButtonWrapper = styled.div<Props>`
	position: absolute;
	top: 6px;
	left: 6px;
	z-index: 2;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 2px;
	padding: 5px 8px;
	cursor: pointer;
	height: 31px;
	box-sizing: border-box;
	color: ${WDSVariables.wdsColorDarkBlueGray};
	font-size: ${WDSVariables.wdsFontSizeXs};
	font-weight: ${WDSVariables.wdsFontWeightBold};
`;

const UnmuteButton: React.FC = () => {
	const { player } = useContext(PlayerContext);
	const [muted, setMuted] = useState(true);
	const unmute = () => {
		console.log(player);
		player?.setMute(false);
		setMuted(false);
	};

	if (!muted) return null;

	return (
		<UnmuteButtonWrapper onClick={unmute} muted={muted}>
			<IconSoundOff />
			{/* TODO: use i18n */}
			Play Sound
		</UnmuteButtonWrapper>
	);
};

export default UnmuteButton;
