import React from 'react';
import styled from 'styled-components';
import UnmuteButton  from 'src/players/DesktopArticleVideoPlayer/OnScreenVideoPlayer/UnmuteButton';
import UserFeedback from 'src/players/DesktopArticleVideoPlayer/OnScreenVideoPlayer/UserFeedback/UserFeedback';
import JwPlayerWrapper from 'src/players/shared/JwPlayerWrapper';

const UserActionTopBar = styled.div`
    padding: 5px 8px;
    position: absolute;
    top: 6px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const OnScreenVideoPlayer = () => (
    <>
        <UserActionTopBar>
            <UnmuteButton />
            <UserFeedback />
        </UserActionTopBar>
        <JwPlayerWrapper />
    </>
)

export default OnScreenVideoPlayer;
