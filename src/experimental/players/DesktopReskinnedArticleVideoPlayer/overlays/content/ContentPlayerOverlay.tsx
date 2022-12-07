import React, { useContext } from 'react';
import styled from 'styled-components';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import { ContentPlayerOverlayProps } from 'experimental/types';
import ContentPlayerFullOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerFullOverlay';
import ContentPlayerScrollOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerScrollOverlay';
import usePlaying from 'jwplayer/utils/usePlaying';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import useRelatedOpen from 'jwplayer/utils/useRelatedOpen';

const PlayerOverlayAllowClick = styled(PlayerOverlay)`
	${(props) => props.showOverlay && `pointer-events: auto;`}
`;

const ContentPlayerOverlay: React.FC<ContentPlayerOverlayProps> = ({ isScrollPlayer, showOverlay }) => {
	const { player } = useContext(PlayerContext);
	const isPlaying = usePlaying();
	const isRelatedOpen = useRelatedOpen();

	return (
		<PlayerOverlayAllowClick
			showOverlay={(showOverlay && !isRelatedOpen) || !isPlaying}
			handleOverlayClick={isPlaying ? player?.pause : player?.play}
		>
			{isScrollPlayer ? <ContentPlayerScrollOverlay /> : <ContentPlayerFullOverlay />}
		</PlayerOverlayAllowClick>
	);
};

export default ContentPlayerOverlay;
