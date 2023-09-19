import { communicationService } from './communication/communicationService';

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
	const mockedVastUrl = 'https://pubads.g.doubleclick.net/gampad/ads?iu=%2F5441%2Fwka1b.VIDEO%2Ffeatured%2Fdesktop%2Fucp_desktop-fandom-fv-article%2F_project43-life&sz=640x480&gdfp_req=1&output=xml_vast4&unviewed_position_start=1&env=vp&cust_params=src%3Dtest%26pos%3Dfeatured%26post_id%3D-1';

	sendMockedDataPrivacyAction();
	sendMockedAdEngineConfiguredAction();
	communicationService.dispatch( {
		...adEngineSetupJWPlayerActionPayload,
		strategyRulesEnabled: true,
		vastUrl: mockedVastUrl,
	});
}
