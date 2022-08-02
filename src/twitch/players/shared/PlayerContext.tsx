import React from 'react';
import { Player } from 'twitch/types';

interface PlayerContextInterface {
	player: Player;
	setPlayer: (playerInstance) => void;
	playerName: string;
}

export const PlayerContext = React.createContext<PlayerContextInterface | null>(null);
