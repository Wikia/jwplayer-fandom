import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function usePlaying(): boolean {
	const [playing, setPlaying] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		if (player?.getState() === 'playing') {
			setPlaying(true);
		}

		player?.on(JWEvents.PLAY, () => {
			setPlaying(true);
		});
		player?.on(JWEvents.PAUSE, () => {
			setPlaying(false);
		});
	}, [player]);

	return playing;
}
