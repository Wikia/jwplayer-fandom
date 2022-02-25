import React, { useState } from 'react';
import { PlayerContext } from 'src/players/shared/PlayerContext';
import { Player } from 'src/types';

const PlayerWrapper = ({ children }) => {
	const [jwPlayer, setJwPlayer] = useState<Player>(null);

	const setPlayer = (player: Player) => {
		setJwPlayer(player);
	};

	return <PlayerContext.Provider value={{ player: jwPlayer, setPlayer: setPlayer }}>{children}</PlayerContext.Provider>;
};

export default PlayerWrapper;
