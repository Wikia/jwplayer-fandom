import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

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
	z-index: 3;
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
	/* Getting the player mute state instead of just setting it to true prevents the UNMUTE button from showing up again.
	 * This UNMUTE button shows up again when the floating/scroll player activates after the user has already clicked the UNMUTE button.
	 * Once the user scrolls back up, the UNMUTE button show up again, even though the player is already in an unmuted state.
	 *
	 * In case the player object is not set for whatever reason, then we just default to true until the player does get set.
	 * */
	const initialMuteState = player?.getMute ? player.getMute : true;
	const [muted, setMuted] = useState(initialMuteState);
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
