import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useMute(): boolean {
	const [mute, setMute] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		if (player?.getMute()) {
			setMute(true);
		}

		player?.on(JWEvents.MUTE, () => {
			setMute(!mute);
		});
	}, [player]);

	return mute;
}
