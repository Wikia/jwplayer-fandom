/*
 * Script removes unused, test packages from artifactory (jfrog registry)
 * It removes any test package (which version does not match semver `X.Y.Z`
 * (e.g. version `2.4.6-COTECH-123` or `2.4.6anything` are treated as test versions,
 * `2.4.6` is not a test version) which version number is lower than the current version
 * minus one minor version (e.g. if the current version in 2.6.4 we will remove all test packages
 * that are marked as 2.4.X and lower (we'll keep 2.6.X and 2.5.X).
 *
 * USAGE:
 *
 * node scripts/artifactory-cleanup.js
 *
 *
 * The script uses your artifactory identity token
 * which you should have saved in `.npmrc` (or `.yarnrc) file in your user home dir.
 * The script reads the token using `yarn config get "//artifactory.wikia-inc.com/artifactory/api/npm/wikia-npm/:_authToken"` command
 */

const exec = require('child_process').exec;
const semver = require('semver');
const packageJson = require('../package.json');

const BASE_ARTIFATORY_URL = 'https://artifactory.wikia-inc.com/artifactory';
const BASE_PACKAGE_PATH = '/npm-local/@fandom/jwplayer-fandom/-/@fandom';
const BASE_READ_PATH = `/api/storage${BASE_PACKAGE_PATH}`;
const BASE_DELETE_PATH = BASE_PACKAGE_PATH;

const currentMajorVersion = semver.major(packageJson.version);
const previousMinorVersion = semver.minor(packageJson.version) - 1;
const versionThreshold = `${currentMajorVersion}.${previousMinorVersion}.0`;

async function getArtifactoryTokenFromYarnConfig() {
	return new Promise((resolve, reject) => {
		exec(
			'yarn config get "//artifactory.wikia-inc.com/artifactory/api/npm/wikia-npm/:_authToken"',
			(err, stdout, stderr) => {
				if (stderr) {
					reject(stderr);
				} else {
					resolve(stdout.trim());
				}
			},
		);
	});
}

function extractVersionFromPackageName(packageName) {
	return packageName.match(/^\/jwplayer-fandom-(\d+\.\d+\.\d+).*\.tgz/)?.[1];
}

function isTestVersion(packageName) {
	return !packageName.match(/^\/jwplayer-fandom-\d+\.\d+\.\d+\.tgz/);
}

async function fetchTestPackages() {
	const response = await fetch(`${BASE_ARTIFATORY_URL}${BASE_READ_PATH}`);
	const json = await response.json();

	return json.children.map((child) => child.uri).filter(isTestVersion);
}

async function deletePackage(packageName) {
	const token = await getArtifactoryTokenFromYarnConfig();
	await fetch(`${BASE_ARTIFATORY_URL}${BASE_DELETE_PATH}${packageName}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

async function deleteTestPackagesWithVersionLowerThan(version) {
	const packages = await fetchTestPackages();
	const packagesToDelete = packages.filter((packageName) => {
		const packageVersion = extractVersionFromPackageName(packageName);
		return !packageVersion || semver.lt(packageVersion, version);
	});

	for (const packageName of packagesToDelete) {
		console.log(`Deleting ${packageName}...`);
		try {
			await deletePackage(packageName);
		} catch (e) {
			console.error(`Error deleting package: ${packageName}`, e);
		}
	}
}

deleteTestPackagesWithVersionLowerThan(versionThreshold);
