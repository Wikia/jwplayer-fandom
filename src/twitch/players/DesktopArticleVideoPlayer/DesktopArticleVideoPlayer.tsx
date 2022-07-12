import React from 'react';
import TwitchPlayerWrapper from 'twitch/players/shared/TwitchPlayerWrapper';
import PlayerWrapper from 'twitch/players/shared/PlayerWrapper';

const DesktopArticleVideoPlayer: React.FC = () => {
	return (
		<PlayerWrapper playerName="desktop-article-video">
			<TwitchPlayerWrapper />
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
