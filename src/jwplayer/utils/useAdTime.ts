import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { AdTimeData } from 'jwplayer/types';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useAdTime(): AdTimeData {
	const [adTime, setAdTime] = useState(undefined);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.AD_TIME, (adTimeData) => {
			setAdTime(adTimeData);
		});
	}, [player]);

	return adTime;
}
