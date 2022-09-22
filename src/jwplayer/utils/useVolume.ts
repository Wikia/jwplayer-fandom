import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import { OnVolumeEventData } from 'jwplayer/types';

export default function useVolume(): number {
	const [volume, setVolume] = useState(0);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		const initialVolume = player?.getVolume() || 0;

		setVolume(initialVolume);

		player?.on(JWEvents.VOLUME, (event: OnVolumeEventData) => {
			setVolume(event.volume);
		});
	}, [player]);

	return volume;
}
