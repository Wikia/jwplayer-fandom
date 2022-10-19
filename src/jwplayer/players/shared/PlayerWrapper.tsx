import React, { useState } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { Player, PlayerConfig } from 'jwplayer/types';

const PlayerWrapper: React.FC<{ playerName: string }> = ({ playerName, children }) => {
	const [jwPlayer, setJwPlayer] = useState<Player>(null);
	const [jwPlayerConfig, setJwPlayerConfig] = useState<PlayerConfig>(null);
	const [jwPlayerAdPlaying, setjwPlayerAdPlaying] = useState(false);

	const setPlayer = (player: Player) => {
		setJwPlayer(player);
	};

	const setConfig = (config: PlayerConfig) => {
		setJwPlayerConfig(config);
	};

	const setAdPlaying = (adPlaying: boolean) => {
		setjwPlayerAdPlaying(adPlaying);
	};

	return (
		<PlayerContext.Provider
			value={{
				player: jwPlayer,
				setPlayer: setPlayer,
				playerName,
				config: jwPlayerConfig,
				setConfig: setConfig,
				setAdPlaying: setAdPlaying,
				adPlaying: jwPlayerAdPlaying,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};

export default PlayerWrapper;
