import { useEffect, useContext } from 'react';
import useStateRef from 'experimental/utils/useStateRef';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function usePauseAfterPlays(pauseAfter: number) {
	const { player } = useContext(PlayerContext);
	const [, setTotalPlays, totalPlaysRef] = useStateRef(0);

	useEffect(() => {
		player?.on(JWEvents.PLAYLIST_ITEM, (): void => {
			setTotalPlays(totalPlaysRef.current + 1);

			if (totalPlaysRef.current === pauseAfter) {
				player?.pause();
			}
		});
	}, [player]);
}
