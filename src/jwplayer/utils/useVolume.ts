import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useVolume(): number {
	const [volume, setVolume] = useState(undefined);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		const initialVolume = player?.getVolume() || 0;

		setVolume(initialVolume);

		player?.on(JWEvents.VOLUME, (volume) => {
			setVolume(volume);
		});
	}, [player]);

	return volume;
}
