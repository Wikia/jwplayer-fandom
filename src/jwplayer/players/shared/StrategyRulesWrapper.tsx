import React, { useRef } from 'react';
import JwPlayerWrapperWithStrategyRules from 'jwplayer/players/shared/JwPlayerWrapperWithStrategyRules';
import { JwPlayerWrapperProps } from 'jwplayer/types';
import useJwpAdsSetupComplete from 'jwplayer/utils/useJwpAdsSetupComplete';

export const StrategyRulesWrapper: React.FC<JwPlayerWrapperProps> = ({ getDismissed, config, onReady }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);

	const jwpAdsSetupComplete = useJwpAdsSetupComplete();
	const { vastUrl, vastXml } = jwpAdsSetupComplete;
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
					vastXml={vastXml}
					parentRef={placeholderRef}
				/>
			)}
		</>
	);
};
