import { useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { PlaylistItemPlayerEventData } from 'jwplayer/types';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function usePauseAfterPlays(pauseAfter: number) {
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.PLAYLIST_ITEM, (event: PlaylistItemPlayerEventData): void => {
			if (event.index === pauseAfter) {
				player?.pause();
			}
		});
	}, [player]);
}
