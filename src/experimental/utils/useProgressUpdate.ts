import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import { OnVideoTimeEventData } from 'jwplayer/types';

export interface ProgressUpdateData extends OnVideoTimeEventData {
	// Calculated param, does not come directly from the JW API
	positionPercent: number;
}

const useProgressUpdate = (): ProgressUpdateData => {
	const [progressData, setProgressData] = useState<ProgressUpdateData>({
		duration: 0,
		position: 0,
		viewable: 0,
		positionPercent: 0,
	});
	const { player } = useContext(PlayerContext);

	const getProgressData = (data: ProgressUpdateData): void => {
		console.log('Inside getProgressData: ', data);
		const { duration, position } = data;
		data.positionPercent = (position / duration) * 100;
		setProgressData(data);
	};

	useEffect(() => {
		player?.on(JWEvents.TIME, getProgressData);
	}, [player]);

	return progressData;
};

export default useProgressUpdate;
