import { $ } from 'zx';

import {Env, DESTINATION_MAPPING, VIDEO_PREFIX} from './envs';
import { uploadDistTo } from './gcs';

function getGCSDestination(location: string): string {
	if (!DESTINATION_MAPPING[location]) {
		console.error(`Error: Unknown location ${location}`);
		process.exit(1);
	}


	return String(`${VIDEO_PREFIX}/${DESTINATION_MAPPING[location]}`);
}

export async function deployToEnv(
	env: Env,
) {
	await $`yarn build-stand-alone`;

	// Uploading to Google Cloud Storage
	const gCSLocation = getGCSDestination(env);
	console.log(`Uploading GCS to ${env}`);
	await uploadDistTo(gCSLocation, env);
}
