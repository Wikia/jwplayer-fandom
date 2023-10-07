import React from 'react';
import { Player, PlayerConfig, TimeEventData, AdTimeData, ProgressUpdateData } from 'jwplayer/types';

interface PlayerContextInterface {
	player: Player;
	setPlayer: (playerInstance: Player) => void;
	playerName: string;
	config: PlayerConfig;
	setConfig: (playerConfig: PlayerConfig) => void;
	adPlaying: boolean;
	setAdPlaying: (newAdPlayState: boolean) => void;
	relatedOpen: boolean;
	setRelatedOpen: (newRelatedOpenState: boolean) => void;
	adTime: AdTimeData;
	setAdTime: (adTime: AdTimeData) => void;
	time: TimeEventData;
	setTime: (time: TimeEventData) => void;
	progressData: ProgressUpdateData;
	setProgressData: (progressUpdateData: ProgressUpdateData) => void;
}

export const PlayerContext = React.createContext<PlayerContextInterface | null>(null);
