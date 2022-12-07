import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { AdImpressionEventData } from 'jwplayer/types';
import JWEvents from 'jwplayer/players/shared/JWEvents';

export default function useAdImpression(): AdImpressionEventData {
	const [adImpression, setAdImpression] = useState(undefined);
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		player?.on(JWEvents.AD_IMPRESSION, (adImpression) => {
			setAdImpression(adImpression);
		});
	}, [player]);

	return adImpression;
}
