import React from 'react';
import { Player, PlayerConfig } from 'jwplayer/types';

interface PlayerContextInterface {
	player: Player;
	setPlayer: (playerInstance) => void;
	playerName: string;
	config: PlayerConfig;
	setConfig: (playerConfig) => void;
}

export const PlayerContext = React.createContext<PlayerContextInterface | null>(null);
