import React from 'react';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import { DesktopArticleVideoPlayerContent } from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';
import usePauseAfterPlays from 'experimental/utils/usePauseAfterPlays';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';

const DesktopPauseAfterPlayPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	// TODO: set actual pause after play amount
	usePauseAfterPlays(1);

	return <DesktopArticleVideoPlayerContent videoDetails={videoDetails} />;
};

const DesktopPauseAfterPlayPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => (
	<PlayerWrapper playerName="jw-desktop-article-video-pause-after-play">
		<DesktopPauseAfterPlayPlayerContent videoDetails={videoDetails} />;
	</PlayerWrapper>
);

export default DesktopPauseAfterPlayPlayer;
