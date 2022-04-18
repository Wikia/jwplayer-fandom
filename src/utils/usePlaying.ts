import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'players/shared/PlayerContext';
import { jwPlayerVideoTracker } from 'utils/videoTracking';

export default function usePlaying(): boolean {
	const [playing, setPlaying] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		if (player?.getState() === 'playing' || player?.getConfig().autostart) {
			setPlaying(true);
		}

		player?.on('play', () => {
			setPlaying(true);
			jwPlayerVideoTracker({ action: 'play' });
		});
		player?.on('pause', () => {
			setPlaying(false);
			jwPlayerVideoTracker({ action: 'pause' });
		});

		// TODO What is going on here?
		return () => {
			player?.on('play', () => setPlaying(true));
			player?.on('pause', () => setPlaying(false));
		};
	}, [player]);

	return playing;
}
