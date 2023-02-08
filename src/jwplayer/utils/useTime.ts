import { useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { TimeEventData } from 'jwplayer/types';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useTime(): TimeEventData {
	const { player, setTime, time } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.TIME, (event: TimeEventData) => {
			setTime(event);
		});
	}, [player]);

	return time;
}
