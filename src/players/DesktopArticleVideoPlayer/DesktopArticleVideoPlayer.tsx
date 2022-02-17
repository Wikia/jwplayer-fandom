import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import UnmuteButton  from 'src/players/DesktopArticleVideoPlayer/UnmuteButton';
import UserFeedback from 'src/players/DesktopArticleVideoPlayer/UserFeedback/UserFeedback';
import JwPlayerWrapper from 'src/players/shared/JwPlayerWrapper';
import useOnScreen from 'src/utils/useOnScreen';

const DesktopArticleVideoTopPlaceholder = styled.div`
    height: 500px;
    width: 500px;
    background-color: black;
`;

const UserActionTopBar = styled.div`
    padding: 5px 8px;
    position: absolute;
    top: 6px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

interface Props {
	onScreen: boolean;
}

const DesktopArticleVideoWrapper = styled.div<Props>`
    ${(props) =>
        !props.onScreen &&
        css`
            width: 300px;
            position: fixed; 
            bottom: 0;
        `}
`;

const DesktopArticleVideoPlayer = () => {
    const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref);

    return (
        <DesktopArticleVideoTopPlaceholder ref={ref}>
            <DesktopArticleVideoWrapper onScreen={onScreen}>
                { onScreen && (
                    <UserActionTopBar>
                        <UnmuteButton />
                        <UserFeedback />
                    </UserActionTopBar>
                )}
                <JwPlayerWrapper />
            </DesktopArticleVideoWrapper>
        </DesktopArticleVideoTopPlaceholder>
    );
}

export default DesktopArticleVideoPlayer;
