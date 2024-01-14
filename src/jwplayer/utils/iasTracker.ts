import { scriptLoader } from 'jwplayer/utils/scriptLoader';

const scriptUrl = '//static.adsafeprotected.com/vans-adapter-google-ima.js';
class IasTracker {
	private scriptPromise: Promise<Event>;

	public async loadIasTrackerIfEnabled(): Promise<void> {
		if (localStorage.getItem('instant-config-fandomdesktop') != null) {
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
