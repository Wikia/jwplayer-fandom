const [siteId, jwpApiSecret, dryRun] = process.argv.slice(2);

if (!siteId || !jwpApiSecret) {
	console.error(`Required arguments are missing`);
	console.info(`Usage example:
		cat categories.json | node jwp-imports-create.js [site-id] [api-secret] [[dry-run]]
	`);
	process.exit(1);
}

const jwpApiUrl = `https://api.jwplayer.com/v2/sites/${siteId}/imports/`;
const mrssFeedUrl = 'https://services.fandom.com/article-video/mrss/feed/';

const buildMrssFeedUrl = (categorySlug) => {
	const url = new URL(mrssFeedUrl);
	url.searchParams.set('categorySlug', categorySlug);
	url.searchParams.set('sortBy', 'views');

	return url.toString();
};

const createImport = (categorySLug) => {
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: jwpApiSecret,
		},
		body: JSON.stringify({
			metadata: {
				host_on_import: false,
				url: buildMrssFeedUrl(categorySLug),
				title: `Medal.tv / ${categorySLug}`,
				state: 'importing',
			},
		}),
	};

	return fetch(jwpApiUrl, options)
		.then((response) => response.json())
		.then((response) => {
			if (response.errors) {
				response.errors.forEach((error) => console.error(`${error.code}:`, error.description));
				throw new Error('Failed to create an import');
			}
			return response;
		})
		.catch((err) => console.error(err));
};

const processCategories = async (categorySlugs) => {
	const slugs = JSON.parse(categorySlugs);
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	if (dryRun && dryRun !== '0') {
		console.debug(`Creating imports for ${slugs.length} categories`);
		return;
	}
	for (const slug of slugs) {
		await createImport(slug).then((response) => {
			console.info(`Import "${response.metadata.title}" (id: ${response.id}) created successfully ✔️`);
		});
		// just to avoid rate limiting
		await delay(1000);
	}
};

let jsonData = '';
process.stdin.on('data', (chunk) => {
	jsonData += chunk;
});

process.stdin.on('end', () => {
	try {
		void processCategories(jsonData.trim());
	} catch (err) {
		console.error('Error: Invalid JSON input from stdin');
		process.exit(1);
	}
});
