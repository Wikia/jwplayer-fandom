import React, { useState } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { AdTimeData, Player, PlayerConfig, TimeEventData, ProgressUpdateData } from 'jwplayer/types';
import { OptimizelyContextProvider } from 'optimizely/OptimizelyContext';

const PlayerWrapper: React.FC<{ playerName: string; children: React.ReactNode }> = ({ playerName, children }) => {
	const [jwPlayer, setJwPlayer] = useState<Player>(null);
	const [jwPlayerConfig, setJwPlayerConfig] = useState<PlayerConfig>(null);
	const [jwPlayerAdPlaying, setjwPlayerAdPlaying] = useState(false);
	const [jwPlayerRelatedOpen, setjwPlayerRelatedOpen] = useState(false);
	const [jwPlayerAdTime, setJwPlayerAdTime] = useState<AdTimeData>(null);
	const [jwPlayerTime, setJwPlayerTime] = useState<TimeEventData>({ duration: 0, position: 0, viewable: 0 });
	const [jwProgressData, setJwProgressData] = useState<ProgressUpdateData>({
		duration: 0,
		position: 0,
		viewable: 0,
		positionPercent: 0,
	});

	const setPlayer = (player: Player) => {
		setJwPlayer(player);
	};

	const setConfig = (config: PlayerConfig) => {
		setJwPlayerConfig(config);
	};

	const setAdPlaying = (adPlaying: boolean) => {
		setjwPlayerAdPlaying(adPlaying);
	};

	const setRelatedOpen = (relatedOpen: boolean) => {
		setjwPlayerRelatedOpen(relatedOpen);
	};

	const setAdTime = (adTime: AdTimeData) => {
		setJwPlayerAdTime(adTime);
	};

	const setTime = (time: TimeEventData) => {
		setJwPlayerTime(time);
	};

	const setProgressData = (progressData: ProgressUpdateData) => {
		setJwProgressData(progressData);
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
				setRelatedOpen: setRelatedOpen,
				relatedOpen: jwPlayerRelatedOpen,
				setAdTime: setAdTime,
				adTime: jwPlayerAdTime,
				setTime: setTime,
				time: jwPlayerTime,
				setProgressData: setProgressData,
				progressData: jwProgressData,
			}}
		>
			<OptimizelyContextProvider>{children}</OptimizelyContextProvider>
		</PlayerContext.Provider>
	);
};

export default PlayerWrapper;
