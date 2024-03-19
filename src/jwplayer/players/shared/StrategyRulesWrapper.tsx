import React, { useRef } from 'react';
import JwPlayerWrapperWithStrategyRules from 'jwplayer/players/shared/JwPlayerWrapperWithStrategyRules';
import { JwPlayerWrapperProps } from 'jwplayer/types';
import useJwpAdsSetupComplete from 'jwplayer/utils/useJwpAdsSetupComplete';

export const StrategyRulesWrapper: React.FC<JwPlayerWrapperProps> = ({ getDismissed, config, onReady, topBarRef }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);

	const jwpAdsSetupComplete = useJwpAdsSetupComplete();
	const vastUrl = jwpAdsSetupComplete.vastUrl;
	const setupComplete = jwpAdsSetupComplete.complete;

	return (
		<>
			<div className="strategyRulesWrapper" ref={placeholderRef} />
			{setupComplete && placeholderRef && (
				<JwPlayerWrapperWithStrategyRules
					getDismissed={getDismissed}
					config={config}
					onReady={onReady}
					vastUrl={vastUrl}
					parentRef={placeholderRef}
					topBarRef={topBarRef}
				/>
			)}
		</>
	);
};
