import React, { useContext } from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import { UnmuteButtonProps } from 'experimental/types';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const UnmuteButtonWrapper = styled.div`
	align-items: center;
	cursor: pointer;
	font-size: ${WDSVariables.wdsFontSizeXs};
	font-weight: ${WDSVariables.wdsFontWeightBold};
	height: 31px;
`;

const StyledSoundIcon = styled(IconSoundOff)`
	fill: #fff;
	height: 14px;
	margin-right: 6px;
	min-width: 14px;
	width: 14px;
`;

const UnmuteButton: React.FC<UnmuteButtonProps> = ({ hasLabel }) => {
	const { player } = useContext(PlayerContext);
	const unmute = () => {
		player?.setMute(false);
	};

	return (
		<UnmuteButtonWrapper onClick={unmute}>
			<StyledSoundIcon />
			{hasLabel ? 'Play Sound' : null}
		</UnmuteButtonWrapper>
	);
};

export default UnmuteButton;
