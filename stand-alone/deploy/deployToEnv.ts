import { $ } from 'zx';

import { Env, DESTINATION_MAPPING, VIDEO_PREFIX, VIDEO_DIR } from './envs';
import { uploadDistTo } from './gcs';

function getGCSDestination(location: string): string {
	if (!DESTINATION_MAPPING[location]) {
		console.error(`Error: Unknown location ${location}`);
		process.exit(1);
	}

	return String(`${VIDEO_PREFIX}/${DESTINATION_MAPPING[location]}/${VIDEO_DIR}`);
}

export async function deployToEnv(env: Env) {
	await $`yarn build`;

	// Uploading to Google Cloud Storage
	const gCSLocation = getGCSDestination(env);
	console.log(`gCSLocation set to - ${gCSLocation}`);
	console.log(`Uploading GCS to ${env}`);
	await uploadDistTo(gCSLocation, env);
}
