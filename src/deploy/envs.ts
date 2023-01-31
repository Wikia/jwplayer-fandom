export enum Env {
	PROD = 'prod',
	TEST = 'test',
}
export const VALID_ENVS = Object.values(Env);

// These environments may need to be matured a bit.
// It might be useful to add a dev, dev-branch and maybe a prod branch environment
// to make use of this stand-alone (News & Rating / RedVenture) video player across different envs.
export const DESTINATION_MAPPING: Record<Env, string> = {
	[Env.PROD]: 'prod',
	[Env.TEST]: 'test',
};

export const BUCKET_NAME = 'silversurfer';
export const VIDEO_PREFIX = 'video';
export const VIDEO_DIR = 'standalone-dist';
