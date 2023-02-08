import { argv } from 'zx';

import { deployToEnv } from 'deploy/deployToEnv';
import { VALID_ENVS, Env } from 'deploy/envs';

const env = argv['env'] as Env;

if (!env || !VALID_ENVS.includes(env)) {
	console.error('Must specify the env to deploy to (--env prod)');
	process.exit(1);
}

console.log(`Deploying to ${env}`);

deployToEnv(env);
