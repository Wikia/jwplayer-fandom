import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useAdPlaying(): boolean {
	const [adPlaying, setAdPlaying] = useState(true);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.AD_PLAY, () => {
			setAdPlaying(true);
		});

		player?.on(JWEvents.AD_PAUSE, () => {
			setAdPlaying(false);
		});
	}, [player]);

	return adPlaying;
}
