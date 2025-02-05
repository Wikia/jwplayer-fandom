const [siteId, jwpApiSecret, dryRun] = process.argv.slice(2);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (!siteId || !jwpApiSecret) {
	console.error(`Required arguments are missing`);
	console.info(`Usage example:
		node jwp-imports-update.js [site-id] [api-secret] [[dry-run]]
	`);
	process.exit(1);
}

if (dryRun) {
	console.info(`Dry run mode enabled. No changes will be made.`);
}

const jwpApiUrl = `https://api.jwplayer.com/v2/sites/${siteId}/imports/`;

/**
 * @typedef {Object} ImportItem
 * @property {string} id - Unique identifier of the import.
 * @property {Object} metadata - Metadata object.
 * @property {string[]} [metadata.simple_ingest_custom_params] - List of custom parameters.
 */

/**
 * @typedef {Object} ImportResponse
 * @property {number} page - Current page number.
 * @property {number} page_length - Number of items per page.
 * @property {number} total - Total number of items.
 * @property {ImportItem[]} sources - Array of import items.
 */

/**
 * Fetches a page of imports.
 * @param {number} [page=1] - The page number to fetch.
 * @returns {Promise<ImportResponse|null>} Returns a promise that resolves to the response or null on error.
 */
const fetchImports = async (page = 1) => {
	const url = `${jwpApiUrl}?page=${page}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: jwpApiSecret,
		},
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			console.error(`HTTP error while fetching imports (page ${page}): ${response.status} - ${response.statusText}`);
			return null;
		}
		return await response.json();
	} catch (err) {
		console.error(`Failed to fetch imports (page ${page}):`, err.message);
		return null;
	}
};

/**
 * Fetches all imports using pagination.
 * @returns {Promise<ImportItem[]>} A promise that resolves to an array of import items.
 */
const fetchAllImports = async () => {
	let page = 1;
	let allSources = [];

	console.info(`Fetching all imports...`);

	while (true) {
		const response = await fetchImports(page);
		if (!response || !response.sources) break;

		allSources = allSources.concat(response.sources);

		// Check if all items have been fetched.
		if (response.page * response.page_length >= response.total) break;
		page++;
		await delay(1000);
	}

	console.info(`Fetched ${allSources.length} sources!`);

	return allSources;
};

/**
 * Sends a PATCH request for a single import to add "fandom:thumbnail" to metadata.simple_ingest_custom_params.
 * @param {ImportItem} importItem - The import item to update.
 * @returns {Promise<void>}
 */
const patchImport = async (importItem) => {
	const { id, metadata } = importItem;
	// Retrieve the current list of parameters; if it doesn't exist or isn't an array, initialize an empty array.
	let currentParams = Array.isArray(metadata?.simple_ingest_custom_params) ? metadata.simple_ingest_custom_params : [];

	// Add "fandom:thumbnail" only if it's not already present.
	if (!currentParams.includes('fandom:thumbnail')) {
		currentParams.push('fandom:thumbnail');
	} else {
		console.info(`Import ${id} already has 'fandom:thumbnail' in simple_ingest_custom_params`);
		return;
	}

	// Prepare the payload for the PATCH request.
	const patchPayload = {
		metadata: {
			simple_ingest_custom_params: currentParams,
		},
	};

	// Construct the PATCH URL – assuming a trailing slash is required.
	const patchUrl = `${jwpApiUrl}${id}/`;
	const options = {
		method: 'PATCH',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: jwpApiSecret,
		},
		body: JSON.stringify(patchPayload),
	};

	if (dryRun) {
		console.info(`[Dry Run] Would patch import ${id} with:`, patchPayload);
		return;
	}

	try {
		const response = await fetch(patchUrl, options);
		if (!response.ok) {
			console.error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
			return;
		}
		const result = await response.json();
		console.log(`Successfully patched import ${id}:`, result);
	} catch (error) {
		console.error(`Failed to patch import ${id}:`, error.message);
	}
};
/**
 * Fetches all imports and then sends a PATCH request for each one.
 * @returns {Promise<void>}
 */
const updateAllImports = async () => {
	const sources = await fetchAllImports();
	for (const source of sources) {
		await patchImport(source);
		await delay(1000);
	}
};

void updateAllImports();
