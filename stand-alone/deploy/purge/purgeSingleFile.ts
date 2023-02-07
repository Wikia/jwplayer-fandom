import { $, argv } from 'zx';

import { NODES } from './nodes';

async function main(): Promise<void> {
	const file = argv._[0];

	if (!file) {
		console.error(
			`Must specify full url to purge (e.g. https://static.wikia.nocookie.net/silversurfer/video/prod/standalone-dist/standAlone_RV_VideoPlayer.js) (got '${file}')`,
		);
		process.exit(1);
	}

	NODES.forEach(async (node) => {
		await $`curl -X PURGE ${file} --resolve static.wikia.nocookie.net:443:$(dig +short ${node}.wikia-prod)`;
	});
}

main();
