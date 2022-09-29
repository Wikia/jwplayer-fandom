import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { TimeEventData } from 'jwplayer/types';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function usePlaying(): TimeEventData {
	const [time, setTime] = useState({ duration: 0, position: 0, viewable: 0 });
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.TIME, (event: TimeEventData) => {
			setTime(event);
		});
	}, [player]);

	return time;
}
