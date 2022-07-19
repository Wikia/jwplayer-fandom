import React, { useRef } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css } from 'styled-components';
import TwitchPlayerWrapper from 'twitch/players/shared/TwitchPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'twitch/players/shared/PlayerWrapper';

const MobileArticleVideoTopPlaceholder = styled.div`
	width: 100%;
	height: 56.25vw;
	position: relative;
`;

interface MobileArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	topPosition: string;
}

const MobileArticleVideoWrapper = styled.div<MobileArticleVideoWrapperProps>`
	${(props) =>
		props.isScrollPlayer
			? css`
					box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
					position: fixed;
					top: ${props.topPosition};
					width: 100%;
					z-index: ${Number(WDSVariables.z2) + 1};
			  `
			: css`
					transform: translateZ(0);
					-webkit-transform: translateZ(0);
					-webkit-transition: padding 0.3s;
					transition: padding 0.3s;
					padding: 0;
			  `}
`;

interface MobileArticleVideoPlayerProps {
	hasPartnerSlot?: boolean;
	isFullScreen?: boolean;
}

const MobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({ hasPartnerSlot, isFullScreen }) => {
	const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref, '0px', 1);
	// const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !onScreen;

	const getTopPosition = () => {
		if (isFullScreen) {
			return '0px';
		}

		if (hasPartnerSlot) {
			return '75px';
		}

		return '55px';
	};

	return (
		<PlayerWrapper playerName="twitch-mobile-article-video">
			<MobileArticleVideoTopPlaceholder ref={ref}>
				<MobileArticleVideoWrapper isScrollPlayer={isScrollPlayer} topPosition={getTopPosition()}>
					<TwitchPlayerWrapper />
				</MobileArticleVideoWrapper>
			</MobileArticleVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default MobileArticleVideoPlayer;