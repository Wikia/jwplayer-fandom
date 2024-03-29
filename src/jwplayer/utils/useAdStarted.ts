import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useAdStarted(): boolean {
	const [adStarted, setAdStarted] = useState(false);
	const { player, setAdPlaying } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.AD_STARTED, () => {
			setAdStarted(true);
			setAdPlaying(true);
		});

		player?.on(JWEvents.AD_COMPLETE, () => {
			setAdStarted(false);
			setAdPlaying(false);
		});

		player?.on(JWEvents.AD_SKIPPED, () => {
			setAdStarted(false);
			setAdPlaying(false);
		});
	}, [player]);

	return adStarted;
}
