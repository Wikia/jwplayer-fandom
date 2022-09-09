import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useAdBreak(): boolean {
	const [adBreak, setAdBreak] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.AD_BREAK_START, () => {
			setAdBreak(true);
		});

		player?.on(JWEvents.AD_BREAK_END, () => {
			setAdBreak(false);
		});
	}, [player]);

	return adBreak;
}
