import React from 'react';
import { MobilePauseAfterPlayPlayerProps } from 'experimental/types';
import { MobileArticleVideoPlayerContent } from 'jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';
import usePauseAfterPlays from 'experimental/utils/usePauseAfterPlays';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';

const MobilePauseAfterPlayPlayerContent: React.FC<MobilePauseAfterPlayPlayerProps> = ({
	videoDetails,
	playsBeforePause,
}) => {
	usePauseAfterPlays(playsBeforePause);

	return <MobileArticleVideoPlayerContent videoDetails={videoDetails} />;
};

const MobilePauseAfterPlayPlayer: React.FC<MobilePauseAfterPlayPlayerProps> = ({
	videoDetails,
	playsBeforePause,
	playerName,
}) => (
	<PlayerWrapper playerName={playerName}>
		<MobilePauseAfterPlayPlayerContent videoDetails={videoDetails} playsBeforePause={playsBeforePause} />;
	</PlayerWrapper>
);

export default MobilePauseAfterPlayPlayer;
