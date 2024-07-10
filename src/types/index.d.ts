export {};

declare global {
	interface Window {
		videoExperiments?: {
			playlistUrl?: string;
		};
		newrelic?: unknown;
		nrvideo?: {
			Core: {
				addTracker: (tracker: unknown) => void;
			};
			JwplayerTracker: (jwplayer: unknown) => void;
		};
	}
}
