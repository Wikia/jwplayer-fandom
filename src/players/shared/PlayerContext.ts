import React from 'react';
import { Player } from 'src/types';

interface PlayerContextInterface {
	player: Player;
	setPlayer: (playerInstance) => void;
}

export const PlayerContext = React.createContext<PlayerContextInterface | null>(null);
