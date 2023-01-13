import { globby } from 'zx';
import fs from 'fs';

import { BUCKET_NAME } from './envs';
import { Storage } from '@google-cloud/storage';
import { Env } from './envs';

const PROD_PATH = `https://static.wikia.nocookie.net/`;

function ensurePath(path: string): void {
	fs.mkdir(path, { recursive: true }, (err) => {
		if (err) {
			throw err;
		}
	});
}

// ensure gcs.json has the auth information for GCS
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'vault-gcs.json';
const storage = new Storage();

export async function getFile<T>(path: string): Promise<T> {
	const file = await storage.bucket(BUCKET_NAME).file(path);
	const exists = (await file.exists())[0];

	if (exists) {
		const readableFile = await file.download();
		const json = JSON.parse(readableFile[0].toString('utf8'));
		return json;
	}

	return null;
}

async function uploadFile(destination: string, file: string, cacheTime: number = 60): Promise<void> {
	const fileNameOnly = file.match(/[^\\/]+$/)[0];
/*	const [fileSaved, metadata] = await storage.bucket(BUCKET_NAME).upload(file, {
		destination: `${destination}/${fileNameOnly}`,
		metadata: {
			cacheControl: `public, max-age=${cacheTime}`,
			metadata: {
				uploadedBy: 'gcs.ts', // custom metadata label
			},
		},
	});*/

	console.log(`${file} uploaded to ${PROD_PATH}${BUCKET_NAME}/${destination}/${fileNameOnly}`);
}

export async function uploadJSObjectToGCS(id, object, fullPath, gcsMetadata = {}) {
	const tempPath = `${__dirname}/uploadCSVToGCS/temp`;
	ensurePath(tempPath);
	const tempFile = `${tempPath}/${id}.json`;
	fs.writeFileSync(tempFile, JSON.stringify(object));

	const [fileSaved, metadata] = await storage.bucket(BUCKET_NAME).upload(tempFile, {
		destination: fullPath,
		metadata: {
			cacheControl: 'public, max-age=3600',
			metadata: {
				uploadedBy: 'gcs.ts', // custom metadata label
			},
			...gcsMetadata,
		},
	});

	console.info(`${tempFile} uploaded to ${PROD_PATH}${BUCKET_NAME}/${fullPath}`);

	return fileSaved;
}

export async function uploadDistTo(destination: string, env: string): Promise<void> {
	const distJSFiles = globby.globbySync(['./standalone-dist/*.js']);

	console.log('distJSFiles: ', distJSFiles);

	if (distJSFiles.length === 0) {
		console.error('No dist files found to upload');
		process.exit(1);
	}

	const cacheTime = env === Env.PROD ? 600 : 60;
	// await Promise.all(distJSFiles.map((file) => uploadFile(destination, file, cacheTime)));
}
