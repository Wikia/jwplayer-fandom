import { useContext, useEffect } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import { ProgressUpdateData } from 'jwplayer/types';

const useProgressUpdate = (): ProgressUpdateData => {
	const { player, setProgressData, progressData } = useContext(PlayerContext);

	const getProgressData = (data: ProgressUpdateData): void => {
		const { duration, position } = data;
		data.positionPercent = (position / duration) * 100;
		setProgressData(data);
	};

	useEffect(() => {
		player?.on(JWEvents.TIME, getProgressData);
		player?.on(JWEvents.AD_TIME, getProgressData);
	}, [player]);

	return progressData;
};

export default useProgressUpdate;
