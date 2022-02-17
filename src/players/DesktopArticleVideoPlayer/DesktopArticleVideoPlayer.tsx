import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import OnScreenVideoPlayer from 'src/players/DesktopArticleVideoPlayer/OnScreenVideoPlayer/OnScreenVideoPlayer';
import OffScreenVideoPlayer from 'src/players/DesktopArticleVideoPlayer/OffScreenVideoPlayer/OffScreenVideoPlayer';
import useOnScreen from 'src/utils/useOnScreen';

const DesktopArticleVideoPlayerWrapper = styled.div`
height: 500px;
width: 500px;
background-color: black;
`;

const DesktopArticleVideoPlayer = () => {
    const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref);

    return (
        <DesktopArticleVideoPlayerWrapper ref={ref}>
            { onScreen ? <OnScreenVideoPlayer /> : <OffScreenVideoPlayer />}
        </DesktopArticleVideoPlayerWrapper>
    );
}

export default DesktopArticleVideoPlayer;
