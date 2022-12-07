import { useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

export default function useRelatedOpen(): boolean {
	const { player, setRelatedOpen, relatedOpen } = useContext(PlayerContext);
	const relatedPlugin = player?.plugins?.related;

	useEffect(() => {
		relatedPlugin?.on('open', () => {
			setRelatedOpen(true);
		});

		relatedPlugin?.on('close', () => {
			setRelatedOpen(false);
		});
	}, [relatedPlugin]);

	return relatedOpen;
}
