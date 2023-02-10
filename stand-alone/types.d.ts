export type Playlist = PlaylistItem | PlaylistItem[] | string | string[];

export type PlaylistItem = {
	title: string;
	duration: number;
	mediaid?: string;
	file?: string;
	image?: string;
	playlist?: PlaylistItem[];
	username?: string;
	userUrl?: string;
	pubdate?: number;
	link?: string;
};

interface ArticleVideoMetadata {
	contentUrl: string;
	description: string;
	duration: string;
	name: string;
	thumbnailUrl: string;
	uploadDate: string;
}

export interface ArticleVideoDetails {
	description: string;
	duration: string;
	feed_instance_id: string;
	impressionsPerSession: number;
	isDedicatedForArticle: boolean;
	kind: string;
	lang: string;
	mediaId: string;
	metadata: ArticleVideoMetadata;
	playlist: Playlist;
	title: string;
	videoTags: string;
}

export interface RedVentureVideoDetails {
	title: string;
	description: string;
	duration: string;
	feed_instance_id: string;
	kind: string;
	mediaId: string;
	playlist: Playlist;
	videoTags: string;
}

export interface JwPlayerContainerId {
	/**
	 * @description An optional parameter that sets the id of the div element on which the JW Player embeds itself on.
	 * @default featured-video__player
	 * @example
	 * {
	 *   jwPlayerContainerEmbedId: 'customContainerId'
	 * }
	 * */
	jwPlayerContainerEmbedId?: string;
}

export interface RedVentureVideoPlayerProps extends JwPlayerContainerId {
	videoDetails: ArticleVideoDetails;
	showScrollPlayer: boolean;
	playerUrl?: string;
}

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
		{
			[K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
		}[Keys];
