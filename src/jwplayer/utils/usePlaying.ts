import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

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
	}, [player]);

	return playing;
}
