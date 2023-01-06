import { JwPlayerContainerId, RedVentureVideoDetails, RequireOnlyOne } from 'jwplayer/types';

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
}

export type RedVenturePlayerContextProps = RequireOnlyOne<
	RedVenturePlayerContext,
	'embedSelector' | 'embedHtmlElement'
>;

export async function getVideoDetails(mediaId: string) {
	try {
		const response = await fetch('https://cdn.jwplayer.com/v2/media' + '/' + mediaId, {
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
