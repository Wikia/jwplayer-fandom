import { useContext, useState, useEffect } from 'react';
import { PlaylistItem, PlaylistItemPlayerEventData } from 'types';
import { PlayerContext } from 'players/shared/PlayerContext';

export default function usePlaylistItem(): PlaylistItem {
	const { player } = useContext(PlayerContext);
	const [playlistItem, setPlaylistItem] = useState<PlaylistItem>({ title: undefined, duration: undefined });

	useEffect(() => {
		if (player?.getState() === 'playing') {
			setPlaylistItem(player?.getPlaylistItem());
		}

		player?.on('playlistItem', (event: PlaylistItemPlayerEventData) => {
			setPlaylistItem(event.item);
		});

		return () => {
			player?.off('playlistItem', (event: PlaylistItemPlayerEventData) => {
				setPlaylistItem(event.item);
			});
		};
	}, [player]);

	return playlistItem;
}
