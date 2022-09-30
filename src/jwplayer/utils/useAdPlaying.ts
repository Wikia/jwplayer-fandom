import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useAdPlaying(): boolean {
	const [adPlaying, setAdPlaying] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.AD_STARTED, () => {
			setAdPlaying(true);
		});

		player?.on(JWEvents.AD_COMPLETE, () => {
			setAdPlaying(false);
		});
	}, [player]);

	return adPlaying;
}
