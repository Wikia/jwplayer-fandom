import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useAdBreak(): boolean {
	const [adBreak, setAdBreak] = useState(false);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.AD_BREAK_START, () => {
			console.debug('AD_BREAK_START');
			setAdBreak(true);
		});
		player?.on(JWEvents.AD_STARTED, () => {
			console.debug('AD_STARTED');
			setAdBreak(true);
		});
		player?.on(JWEvents.AD_LOADED, () => {
			console.debug('AD_LOADED');
			setAdBreak(true);
		});
		player?.on(JWEvents.AD_PLAY, () => {
			console.debug('AD_PLAY');
			setAdBreak(true);
		});

		player?.on(JWEvents.AD_BREAK_END, () => {
			console.debug('AD_BREAK_END');
			setAdBreak(false);
		});
		player?.on(JWEvents.AD_FINISHED, () => {
			console.debug('AD_FINISHED');
			setAdBreak(false);
		});
	}, [player]);

	return adBreak;
}
