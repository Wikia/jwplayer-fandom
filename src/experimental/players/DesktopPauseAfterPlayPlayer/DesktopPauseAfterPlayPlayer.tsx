import React from 'react';
import { DesktopPauseAfterPlayPlayerProps } from 'experimental/types';
import { DesktopArticleVideoPlayerContent } from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';
import usePauseAfterPlays from 'experimental/utils/usePauseAfterPlays';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';

const DesktopPauseAfterPlayPlayerContent: React.FC<DesktopPauseAfterPlayPlayerProps> = ({
	videoDetails,
	playsBeforePause,
}) => {
	usePauseAfterPlays(playsBeforePause);

	return <DesktopArticleVideoPlayerContent videoDetails={videoDetails} />;
};

const DesktopPauseAfterPlayPlayer: React.FC<DesktopPauseAfterPlayPlayerProps> = ({
	videoDetails,
	playsBeforePause,
	playerName,
}) => (
	<PlayerWrapper playerName={playerName}>
		<DesktopPauseAfterPlayPlayerContent videoDetails={videoDetails} playsBeforePause={playsBeforePause} />;
	</PlayerWrapper>
);

export default DesktopPauseAfterPlayPlayer;
