import {
	JwPlayerContainerId,
	RedVentureVideoDetails,
	RequireOnlyOne
} from './types';

export interface RedVenturePlayerContext extends JwPlayerContainerId {
	/**
	 * @description Describes the location where the video player is being embedded. Useful for adding context to video tracking events
	 */
	contextName: string;
	/**
	 * @description One of two embed options. This option allows an html selector to be passed in, and the player finds the first matching Element on the page
	 * @example
	 * {
	 *   embedSelector: '.classNameSelector'
	 * }
	 */
	embedSelector?: string;
	/**
	 * @description One of two embed options. This option takes in a direct HtmlElement, such as a div span etc. This option is useful when there is already a reference to an element, and a search is not required.
	 * @example
	 * const element = document.createElement('div');
	 * {
	 *   embedHtmlElement: element
	 * }
	 * */
	embedHtmlElement?: HTMLElement;
	/**
	 * @description An 8 character JW Media Id that the JW Player can use to play a specific video tied to that id.
	 * The best place to find those is - https://dashboard.jwplayer.com/p/cGlKNUnj/media
	 * @example
	 * {
	 *   mediaId: 'vC4EkkoA'
	 * }
	 * */
	mediaId?: string;
	/**
	 * @description An option that's passed into the JW Player component, which enables or disables the mini player that appears when the player is scrolled out of the user's viewport.
	 * @default true
	 * @example
	 * {
	 *   showScrollPlayer: false
	 * }
	 * */
	showScrollPlayer?: boolean;
	/**
	 * @description An option that allows the JwPlayer Container Id to be auto incremented, by keeping track of how many times the window.loadPlayer function has been called.
	 * When this option is enabled, it'll ignore the jwPlayerContainerEmbedId option, and use the default value of 'featured-video__player'. When the first player is instantiated,
	 * the JWPlayer Container Id will be set to 'featured-video__player_1', to prevent clashes with the default id of 'featured-video__player'. If at any point, a player gets instantiated
	 * on the same page with this option turned off, the player id number counter will not be incremented.
	 * @example
	 * {
	 *   autoIncrementJwPlayerContainerId: true
	 * }
	 * */
	autoIncrementJwPlayerContainerId?: boolean;
	/**
	 * @description An optional parameter that allows the JW Player URL to be passed in, and used by the JW Player library. The player URL will decide which player should be loaded.
	 * The JW Players have different properties, and could be spread across different workspaces. The playerUrl can also take in a signed url, for workspaces
	 * where the player is protected by signed urls. The signed player urls are non-jwt signed urls.
	 * More information on this can be found at - https://docs.jwplayer.com/platform/reference/protect-your-content-with-signed-urls#types-of-signed-urls
	 * @example - unsigned URL example
	 * {
	 *   playerUrl: 'https://cdn.jwplayer.com/libraries/VXc5h4Tf.js'
	 * },
	 * @example - signed URL example
	 * {
	 *   playerUrl: 'https://cdn.jwplayer.com/libraries/5cvxbGL3.js?sig=abc123zzzaaa&exp=1674168554'
	 * }
	 * */
	playerUrl?: string;
	/**
	 * @description A JSON Web Token (JWT) for use with JW Player media ids that are Externally Hosted.
	 * This token must be passed in whenever the JW Workspace that the mediaId is associated with is protected.
	 * You can find out more details about content protection with signed urls by following this link - https://docs.jwplayer.com/platform/reference/protect-your-content-with-signed-urls
	 * @example
	 * {
	 *   jwtSignedContentAuth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzQyNjIzODA2MDAsInJlc291cmNlIjoiL3YyL21lZGlhL2dic25YOW9KIiwiaWF0IjoxNjc0MjYyMzc2fQ.uZs5BYQe-_4IrDeMJCeEMcLF41RmpgrVyzt6PEKi1_I'
	 * }
	 * */
	jwtSignedContentAuth?: string;
}

export type RedVenturePlayerContextProps = RequireOnlyOne<
	RedVenturePlayerContext,
	'embedSelector' | 'embedHtmlElement'
>;

/*
 * If a JW Auth Token is passed in, then generate the correct query String.
 * If nothing is passed in, then just return a blank string.
 * */
const getJWMediaAuthToken = (context: RedVenturePlayerContextProps) => {
	if (context?.jwtSignedContentAuth) {
		return `?token=${context.jwtSignedContentAuth}`;
	}
	return '';
};

export async function getVideoDetails(context: RedVenturePlayerContextProps) {
	const mediaId = context?.mediaId;
	const mediaUrl = `https://cdn.jwplayer.com/v2/media/${mediaId}${getJWMediaAuthToken(context)}`;
	try {
		const response = await fetch(mediaUrl, {
			method: 'get',
		});

		if (!response.ok) {
			console.error(`Could not find video details for mediaId: ${mediaId}`);
			return null;
		}

		return await response.json();
	} catch (e) {
		console.error(`Could not fetch the video details for mediaId: ${mediaId}`, e);
	}
}

export const getVideoWrapperElement = ({ embedSelector, embedHtmlElement }: RedVenturePlayerContextProps): Element => {
	if (embedSelector) {
		return document.querySelector(embedSelector);
	}
	return embedHtmlElement;
};

export const buildRedVentureVideoDetails = (jwDetails): RedVentureVideoDetails => {
	if (!jwDetails) {
		return null;
	}
	return {
		title: jwDetails?.title,
		description: jwDetails?.description,
		kind: jwDetails?.kind,
		playlist: jwDetails?.playlist,
		feed_instance_id: jwDetails?.feed_instance_id,
		videoTags: jwDetails?.playlist?.[0]?.tags,
		duration: jwDetails?.playlist?.[0]?.duration,
		mediaId: jwDetails?.playlist?.[0]?.mediaId,
	};
};

export const canPlayerRender = (context: RedVenturePlayerContextProps): boolean => {
	/* Start prop checking */
	// Can't do anything if a context object isn't set.
	if (!context) {
		console.error('A context object was not provided for the RedVenture JW Player.');
		return false;
	}
	// A contextName has to be provided so that the player understands where it is being placed.
	// This is important for tracking purposes.
	if (!context?.contextName) {
		console.error('A contextName has to be provided in the context object.');
		return false;
	}
	// If neither is set, then we can't decide where to place the video player on the page
	if (!(context?.embedSelector || context?.embedHtmlElement)) {
		console.error(
			'An embed element selector or embed HTML element must be provided in the context object, so that the video player can render on the page.',
		);
		return false;
	}
	// A media id is required for the video player to play anything
	if (!context?.mediaId) {
		console.error('A mediaId has to be provided in the context object.');
		return false;
	}
	/* End prop checking */

	/* Start optional configuration prop checks */
	if (!context?.showScrollPlayer) {
		console.debug('The scroll player feature will not be enabled.');
	}
	/* End optional configuration prop checks */

	return true;
};
