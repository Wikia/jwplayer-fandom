import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'utils/useAdComplete';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import OffScreenOverlay from 'players/MobileArticleVideoPlayer/OffScreenOverlay/OffScreenOverlay';

const MobileArticleVideoTopPlaceholder = styled.div`
	background-color: black;
	width: 100%;
	height: 100%;
`;

interface MobileArticleVideoWrapperProps {
	visibleOnScreen: boolean;
}

const MobileArticleVideoWrapper = styled.div<MobileArticleVideoWrapperProps>`
	${(props) =>
		!props.visibleOnScreen &&
		`
			box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
			position: fixed;
			top: 55px;
			width: 100%;
		`}
`;

const MobileArticleVideoPlayer: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(ref);
	const [dismissed, setDismissed] = useState(false);

	return (
		<PlayerWrapper>
			<MobileArticleVideoTopPlaceholder ref={ref}>
				{adComplete && (
					<MobileArticleVideoWrapper visibleOnScreen={onScreen || dismissed}>
						<JwPlayerWrapper />
						{!onScreen && !dismissed && <OffScreenOverlay dismiss={() => setDismissed(true)} />}
					</MobileArticleVideoWrapper>
				)}
			</MobileArticleVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default MobileArticleVideoPlayer;
