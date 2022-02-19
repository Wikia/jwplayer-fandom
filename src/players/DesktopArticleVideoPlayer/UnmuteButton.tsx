import React, {useContext} from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import IconSoundOff from '@fandom-frontend/react-common/dist/icons/IconSoundOff';
import { PlayerContext } from 'src/players/shared/PlayerContext';

const UnmuteButtonWrapper = styled.div`
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

const UnmuteButton = () => {
    const { player } = useContext(PlayerContext);

    console.log(`==========================================`, player?.getConfig())

    return (
        <UnmuteButtonWrapper>
            <IconSoundOff />
            {/* TODO: use i18n */}
            test test test
        </UnmuteButtonWrapper>
    )
}

export default UnmuteButton;
