import React, { useState } from 'react';
import { PlayerContext } from 'youtube/players/shared/PlayerContext';
import { Player } from 'youtube/types';

const PlayerWrapper: React.FC<{ playerName: string }> = ({ playerName, children }) => {
	const [youtubePlayer, setYoutubePlayer] = useState<Player>(null);

	const setPlayer = (player: Player) => {
		setYoutubePlayer(player);
	};

	return (
		<PlayerContext.Provider value={{ player: youtubePlayer, setPlayer: setPlayer, playerName }}>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerWrapper;
