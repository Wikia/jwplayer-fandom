import React, { useState } from 'react';
import { PlayerContext } from 'twitch/players/shared/PlayerContext';
import { Player } from 'twitch/types';

const PlayerWrapper: React.FC<{ playerName: string }> = ({ playerName, children }) => {
	const [twitchPlayer, setTwitchPlayer] = useState<Player>(null);

	const setPlayer = (player: Player) => {
		setTwitchPlayer(player);
	};

	return (
		<PlayerContext.Provider value={{ player: twitchPlayer, setPlayer: setPlayer, playerName }}>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerWrapper;
