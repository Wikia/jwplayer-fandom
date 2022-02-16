

import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';

const ThumbDownWrapper = styled.div`
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: 22px;
    justify-content: center;
    margin-left: 12px;
    width: 22px;
    background-color: ${WDSVariables.wdsColorAlert};
`;

const ThumbDownButton = () => (
    <ThumbDownWrapper>
        <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF" fill-rule="evenodd">
                <path
                    d="M10.47 7.497H7.956v1.397c0 .977-.587 2.402-1.537 2.96-.14.057-.28.113-.42.113a.84.84 0 0 1-.838-.838V9.004L2.927 6.323v-5.14l.866-.42A5.035 5.035 0 0 1 6 .234h3.91c.755 0 1.398.615 1.398 1.37l.56 4.44v.03c0 .81-.616 1.424-1.398 1.424zm-8.38-.56H.412c-.168 0-.28-.11-.28-.28V.515c0-.168.112-.28.28-.28H2.09c.167 0 .28.112.28.28V6.66c0 .167-.113.28-.28.28z"/>
            </g>
        </svg>
    </ThumbDownWrapper>
)

export default ThumbDownButton;
