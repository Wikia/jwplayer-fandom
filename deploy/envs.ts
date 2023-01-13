export enum Env {
	PROD = 'prod',
	TEST = 'test',
}
export const VALID_ENVS = Object.values(Env);

export const DESTINATION_MAPPING: Record<Env, string> = {
	[Env.PROD]: 'prod/latest',
	[Env.TEST]: 'test',
};

export const BUCKET_NAME = 'silversurfer';
export const VIDEO_PREFIX = 'video'
