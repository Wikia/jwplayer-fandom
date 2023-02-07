import { globby } from 'zx';

import { Storage } from '@google-cloud/storage';

import { BUCKET_NAME } from './envs';
import { Env } from './envs';

const PROD_PATH = `https://static.wikia.nocookie.net/`;

// ensure gcs.json has the auth information for GCS
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'vault-gcs.json';
const storage = new Storage();

async function uploadFile(destination: string, file: string, cacheTime = 1800): Promise<void> {
	const fileNameOnly = file.match(/[^\\/]+$/)[0];
	await storage.bucket(BUCKET_NAME).upload(file, {
		destination: `${destination}/${fileNameOnly}`,
		metadata: {
			cacheControl: `public, max-age=${cacheTime}`,
			metadata: {
				uploadedBy: 'gcs.ts', // custom metadata label
			},
		},
	});

	console.log(`${file} uploaded to ${PROD_PATH}${BUCKET_NAME}/${destination}/${fileNameOnly}`);
}

export async function uploadDistTo(destination: string, env: string): Promise<void> {
	const distJSFiles = globby.globbySync(['./standalone-dist/*.js']);

	console.log('distJSFiles: ', distJSFiles);

	if (distJSFiles.length === 0) {
		console.error('No dist files found to upload');
		process.exit(1);
	}

	const cacheTime = env === Env.PROD ? 600 : 60;
	await Promise.all(distJSFiles.map((file) => uploadFile(destination, file, cacheTime)));
}
