import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'players/shared/PlayerContext';

export default function usePlaying(): boolean {
	const [playing, setPlaying] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		if (player?.getState() === 'playing' || player?.getConfig().autostart) {
			setPlaying(true);
		}

		player?.on('play', () => {
			setPlaying(true);
		});
		player?.on('pause', () => {
			setPlaying(false);
		});

		// TODO What is going on here?
		return () => {
			player?.on('play', () => setPlaying(true));
			player?.on('pause', () => setPlaying(false));
		};
	}, [player]);

	return playing;
}
