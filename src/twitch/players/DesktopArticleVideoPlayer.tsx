import React, { useRef } from 'react';
import TwitchPlayerWrapper from 'twitch/players/shared/TwitchPlayerWrapper';
import PlayerWrapper from 'twitch/players/shared/PlayerWrapper';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css, keyframes } from 'styled-components';
// import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import useOnScreen from 'utils/useOnScreen';
// import { ArticleVideoDetails } from 'jwplayer/types';
// import CloseButton from 'jwplayer/players/shared/CloseButton';

const DesktopArticleVideoTopPlaceholder = styled.div`
	position: absolute;
	width: 100%;
	padding-top: 56.25%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 2;
`;

const moveDownAnimation = (right: number, width: number) => keyframes`
	from {
		right: ${right}px;
		bottom: 100%;
		width: ${width}px;
	}

	to {
		right: 18px;
		bottom: 45px;
		width: 300px;  
	}
`;

interface DesktopArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	right?: number;
	width?: number;
}

const DesktopArticleVideoWrapper = styled.div<DesktopArticleVideoWrapperProps>`
	height: max-content;
	${(props) =>
		props.isScrollPlayer
			? css`
					z-index: ${Number(WDSVariables.z2) + 2};
					position: fixed;
					animation: ${moveDownAnimation(props.right, props.width)} 0.4s normal forwards;
			  `
			: css`
					position: absolute;
					bottom: 0;
					right: 0;
					top: 0;
					left: 0;
					transform: translateZ(0);
					-webkit-transform: translateZ(0);
			  `}
`;

// const TopBar = styled.div`
// 	width: 100%;
// 	position: relative;
// `;

const DesktopArticleVideoPlayer: React.FC = () => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(placeholderRef, '0px', 0.1);
	// const [dismissed, setDismissed] = useState(false);
	// const isScrollPlayer = !(dismissed || onScreen);
	const isScrollPlayer = !onScreen;
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;

	return (
		<PlayerWrapper playerName="twitch-desktop-article-video">
			<DesktopArticleVideoTopPlaceholder ref={placeholderRef}>
				<DesktopArticleVideoWrapper right={right} width={width} isScrollPlayer={isScrollPlayer}>
					{/* <TopBar>
							{!isScrollPlayer && <UnmuteButton />}
							{isScrollPlayer && <CloseButton dismiss={() => setDismissed(true)} />}
						</TopBar> */}
					<TwitchPlayerWrapper />
				</DesktopArticleVideoWrapper>
			</DesktopArticleVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
