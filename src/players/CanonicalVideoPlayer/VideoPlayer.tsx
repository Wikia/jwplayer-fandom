import React, { useRef } from 'react';
import { CanonicalVideoPlayerProps } from 'types';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';

const CanonicalVideoPlayer: React.FC<CanonicalVideoPlayerProps> = ({ playlist, onComplete }) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<PlayerWrapper playerName={'base-player'}>
			<div ref={ref}>
				<JwPlayerWrapper
					playlist={playlist}
					playerUrl={'https://content.jwplatform.com/libraries/tcoydixg.js'}
					onComplete={onComplete}
				/>
			</div>
		</PlayerWrapper>
	);
};

export default CanonicalVideoPlayer;
