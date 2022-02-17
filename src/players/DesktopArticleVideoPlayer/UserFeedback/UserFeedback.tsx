import React from 'react';
import styled from 'styled-components';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import CloseButton from 'src/players/DesktopArticleVideoPlayer/UserFeedback/CloseButton';
import ThumbDownButton from 'src/players/DesktopArticleVideoPlayer/UserFeedback/ThumbDownButton';
import ThumbUpButton from 'src/players/DesktopArticleVideoPlayer/UserFeedback/ThumbUpButton';

const UserFeedbackWrapper = styled.div`
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 2px;
    font-size: 14px;
    max-width: 90%;
    padding: 5px 8px;
    display: flex;
    height: 34px;
    box-sizing: border-box;
    color: ${WDSVariables.wdsColorDarkBlueGray};
`;

const UserFeedback = () => (
    <UserFeedbackWrapper>
        <CloseButton />
        Do you like this video?
        <ThumbUpButton />
        <ThumbDownButton />
    </UserFeedbackWrapper>
)

export default UserFeedback;
