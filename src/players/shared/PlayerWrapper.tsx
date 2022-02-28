import React, { useState } from 'react';
import { PlayerContext } from 'players/shared/PlayerContext';
import { Player } from 'types';

const PlayerWrapper: React.FC = ({ children }) => {
	const [jwPlayer, setJwPlayer] = useState<Player>(null);

	const setPlayer = (player: Player) => {
		setJwPlayer(player);
	};

	return <PlayerContext.Provider value={{ player: jwPlayer, setPlayer: setPlayer }}>{children}</PlayerContext.Provider>;
};

export default PlayerWrapper;
