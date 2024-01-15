import { scriptLoader } from 'jwplayer/utils/scriptLoader';

const scriptUrl = '//static.adsafeprotected.com/vans-adapter-google-ima.js';
class IasTracker {
	private scriptPromise: Promise<Event>;

	public async loadIasTrackerIfEnabled(skin: 'fandomdesktop' | 'fandommobile'): Promise<void> {
		const deserializedConfigData = JSON.parse(localStorage.getItem(`instant-config-${skin}`)).data;
		const { icIASVideoTracking } = JSON.parse(deserializedConfigData);

		if (icIASVideoTracking[0].value === true) {
			await this.load();
		}
	}

	private load(): Promise<Event> {
		if (!this.scriptPromise) {
			this.scriptPromise = scriptLoader.loadScript(scriptUrl, 'text/javascript', true, 'first');
		}

		return this.scriptPromise;
	}
}

export const iasTracker = new IasTracker();
