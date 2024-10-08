import { communicationService } from './communication/communicationService';
import { VAST_URL, VAST_XML } from './videoConfigs';

function sendMockedDataPrivacyAction() {
	communicationService.dispatch({
		type: '[AdEngine OptIn] set opt in',
	});
}

function sendMockedAdEngineConfiguredAction() {
	communicationService.dispatch({
		type: '[Ad Engine] Configured',
		showAds: true,
		autoplayDisabled: false,
	});
}

const adEngineSetupJWPlayerActionPayload = {
	type: '[Ad Engine] Setup JWPlayer',
	showAds: true,
	autoplayDisabled: false,
};

export function unblockPlayer() {
	sendMockedDataPrivacyAction();
	sendMockedAdEngineConfiguredAction();
	communicationService.dispatch(adEngineSetupJWPlayerActionPayload);
}

export function unblockPlayerForStrategyRules() {
	communicationService.dispatch({
		...adEngineSetupJWPlayerActionPayload,
		strategyRulesEnabled: true,
		vastUrl: VAST_URL,
	});
}

export function unblockPlayerForStrategyRulesWithVastXml() {
	communicationService.dispatch({
		...adEngineSetupJWPlayerActionPayload,
		strategyRulesEnabled: true,
		vastUrl: VAST_URL,
		vastXml: VAST_XML,
	});
}

export function unblockPlayerForStrategyRulesWithNoVideoAds() {
	communicationService.dispatch({
		...adEngineSetupJWPlayerActionPayload,
		showAds: false,
		strategyRulesEnabled: true,
	});
}

export function unblockPlayerForVastXml() {
	sendMockedDataPrivacyAction();
	sendMockedAdEngineConfiguredAction();
	communicationService.dispatch({
		...adEngineSetupJWPlayerActionPayload,
		vastXml: VAST_XML,
	});
}
