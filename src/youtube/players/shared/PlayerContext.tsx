import React from 'react';
import { Player } from 'youtube/types';

interface PlayerContextInterface {
	player: Player;
	setPlayer: (playerInstance) => void;
	playerName: string;
}

export const PlayerContext = React.createContext<PlayerContextInterface | null>(null);
