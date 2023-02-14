import React from 'react';
import { MobileArticleVideoPlayerProps } from 'jwplayer/types';
import { MobileArticleVideoPlayerContent } from 'jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';
import usePauseAfterPlays from 'experimental/utils/usePauseAfterPlays';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';

const MobilePauseAfterPlayPlayerContent: React.FC<MobileArticleVideoPlayerProps> = ({ videoDetails }) => {
	// TODO: set actual pause after play amount
	usePauseAfterPlays(1);

	return <MobileArticleVideoPlayerContent videoDetails={videoDetails} />;
};

const MobilePauseAfterPlayPlayer: React.FC<MobileArticleVideoPlayerProps> = ({ videoDetails }) => (
	<PlayerWrapper playerName="jw-mobile-article-video-pause-after-play">
		<MobilePauseAfterPlayPlayerContent videoDetails={videoDetails} />;
	</PlayerWrapper>
);

export default MobilePauseAfterPlayPlayer;
