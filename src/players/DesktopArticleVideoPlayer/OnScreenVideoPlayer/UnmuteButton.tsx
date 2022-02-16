import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';

const UnmuteButtonWrapper = styled.div`
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 2px;
    color: ${WDSVariables.wdsColorDarkBlueGray};
    cursor: pointer;
    display: none;
    font-size: ${WDSVariables.wdsFontSizeXs};
    font-weight: ${WDSVariables.wdsFontWeightBold};
    max-width: 90%;
    padding: 5px 8px;
    position: absolute;
    left: 6px;
    top: 6px;
    z-index: $z-2 - 1;

    &.visible {
        display: flex;
    }
`;

const UnmuteButton = () => (
    <UnmuteButtonWrapper>
        test test test
    </UnmuteButtonWrapper>
)

export default UnmuteButton;
