import React from 'react';
import styled from 'styled-components';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { MobileContentPlayerOverlayProps } from 'experimental/types';
import ContentPlayerFullOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ContentPlayerFullOverlay';
import ContentPlayerScrollOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/overlays/content/ContentPlayerScrollOverlay';
import usePlaying from 'jwplayer/utils/usePlaying';
import useRelatedOpen from 'jwplayer/utils/useRelatedOpen';

const PlayerOverlayAllowClick = styled(PlayerOverlay)`
	pointer-events: ${(props) => (props.showOverlay ? 'auto' : 'none')};
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	-webkit-tap-highlight-color: transparent;
`;

const ContentPlayerOverlay: React.FC<MobileContentPlayerOverlayProps> = ({
	isScrollPlayer,
	showOverlay,
	resetOverlayTimeout,
}) => {
	const isPlaying = usePlaying();
	const isRelatedOpen = useRelatedOpen();

	return (
		<PlayerOverlayAllowClick showOverlay={(showOverlay && !isRelatedOpen) || !isPlaying}>
			{isScrollPlayer ? (
				<ContentPlayerScrollOverlay />
			) : (
				<ContentPlayerFullOverlay resetOverlayTimeout={resetOverlayTimeout} />
			)}
		</PlayerOverlayAllowClick>
	);
};

export default ContentPlayerOverlay;
