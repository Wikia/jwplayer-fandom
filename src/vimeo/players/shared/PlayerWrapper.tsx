import React, { useState } from 'react';
import { PlayerContext } from 'vimeo/players/shared/PlayerContext';
import { Player } from 'vimeo/types';

const PlayerWrapper: React.FC<{ playerName: string; children: React.ReactNode }> = ({ playerName, children }) => {
	const [vimeoPlayer, setVimeoPlayer] = useState<Player>(null);

	const setPlayer = (player: Player) => {
		setVimeoPlayer(player);
	};

	return (
		<PlayerContext.Provider value={{ player: vimeoPlayer, setPlayer: setPlayer, playerName }}>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerWrapper;
