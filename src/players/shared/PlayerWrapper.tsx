import React, { useState } from 'react';
import { PlayerContext } from 'players/shared/PlayerContext';
import { Player, PlayerConfig } from 'types';

const PlayerWrapper: React.FC<{ playerName: string }> = ({ playerName, children }) => {
	const [jwPlayer, setJwPlayer] = useState<Player>(null);
	const [jwPlayerConfig, setJwPlayerConfig] = useState<PlayerConfig>(null);

	const setPlayer = (player: Player) => {
		setJwPlayer(player);
	};

	const setConfig = (config: PlayerConfig) => {
		setJwPlayerConfig(config);
	};

	return (
		<PlayerContext.Provider
			value={{ player: jwPlayer, setPlayer: setPlayer, playerName, config: jwPlayerConfig, setConfig: setConfig }}
		>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerWrapper;
