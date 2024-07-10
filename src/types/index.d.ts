export {};

declare global {
	interface Window {
		videoExperiments?: {
			playlistUrl?: string;
		};
		newrelic?: {
			setCustomAttribute: (name: string, value: string | number | boolean | null, persist?: boolean) => void;
		};
		nrvideo?: {
			Core: {
				addTracker: (tracker: unknown) => void;
			};
			JwplayerTracker: (jwplayer: unknown) => void;
		};
	}
}
