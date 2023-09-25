import React, { useRef } from 'react';
import JwPlayerWrapperWithStrategyRules from 'jwplayer/players/shared/JwPlayerWrapperWithStrategyRules';
import { JwPlayerWrapperProps } from 'jwplayer/types';
import useJwpAdsSetupComplete from 'jwplayer/utils/useJwpAdsSetupComplete';

interface StrategyRulesProps extends JwPlayerWrapperProps {
	onReady: (args: any) => void;
}

export const StrategyRulesWrapper: React.FC<StrategyRulesProps> = ({ getDismissed, config, onReady }) => {
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
				/>
			)}
		</>
	);
};
