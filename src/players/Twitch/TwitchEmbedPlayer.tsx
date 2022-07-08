import React, { useEffect, useState } from 'react';
import { TwitchEmbedProps } from 'types';
import { TwitchPlayer } from 'twitch-player';

const twitchEmbedLinkURL = 'https://player.twitch.tv/js/embed/v1.js';
const fandomTwitchChannel = 'fandom';

const TwitchEmbedPlayer: React.FC<TwitchEmbedProps> = ({ height, width, parentDomains }: TwitchEmbedProps) => {
	const [twitchPlayerScriptLoaded, setTwitchPlayerScriptLoaded] = useState(false);
	const [twitchPlayer, setTwitchPlayer] = useState<TwitchPlayer>(undefined);
	const options = {
		height,
		width,
		channel: fandomTwitchChannel,
		parent: parentDomains,
		muted: true,
	};

	useEffect(() => {
		const script = document.createElement('script');
		script.setAttribute('src', twitchEmbedLinkURL);
		script.addEventListener('load', () => {
			setTwitchPlayerScriptLoaded(true);
			console.debug('Twitch player script loaded.');
		});
		document.body.appendChild(script);
	}, []);

	useEffect(() => {
		// Should only load this once, when the twitchPlayerScript is loaded and the player is not actually set
		if (!twitchPlayer && twitchPlayerScriptLoaded) {
			setTwitchPlayer(TwitchPlayer.FromOptions('fandom-twitch-player', options));
		}
	}, [twitchPlayerScriptLoaded]);

	useEffect(() => {
		// Mute the player at that start
		twitchPlayer.setVolume(0);
	}, [twitchPlayer]);

	return (
		<div>
			<div id={'fandom-twitch-player'} />
		</div>
	);
};

export default TwitchEmbedPlayer;
