import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { MutePlayerEventData } from 'jwplayer/types';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useMute(): boolean {
	const [mute, setMute] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		if (player?.getMute()) {
			setMute(true);
		}

		player?.on(JWEvents.MUTE, (event: MutePlayerEventData) => {
			setMute(event.mute);
		});
	}, [player]);

	return mute;
}
