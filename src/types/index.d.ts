export {};

declare global {
	interface Window {
		videoExperiments?: {
			playlistUrl?: string;
		};
		newrelic?: {
			addPageAction: (name: string, attributes?: Record<string, string | number>) => void;
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
