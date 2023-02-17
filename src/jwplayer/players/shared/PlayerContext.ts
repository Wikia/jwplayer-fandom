import React from 'react';
import { Player, PlayerConfig, TimeEventData, AdTimeData, ProgressUpdateData } from 'jwplayer/types';

interface PlayerContextInterface {
	player: Player;
	setPlayer: (playerInstance) => void;
	playerName: string;
	config: PlayerConfig;
	setConfig: (playerConfig) => void;
	adPlaying: boolean;
	setAdPlaying: (newAdPlayState) => void;
	relatedOpen: boolean;
	setRelatedOpen: (newRelatedOpenState) => void;
	adTime: AdTimeData;
	setAdTime: (adTime) => void;
	time: TimeEventData;
	setTime: (time) => void;
	progressData: ProgressUpdateData;
	setProgressData: (progressUpdateData) => void;
}

export const PlayerContext = React.createContext<PlayerContextInterface | null>(null);
