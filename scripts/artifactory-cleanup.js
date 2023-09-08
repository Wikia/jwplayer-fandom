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

	const packages = json.children.map((child) => child.uri).filter(isTestVersion);

	return packages;
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
		// await deletePackage(packageName);
	}
}

deleteTestPackagesWithVersionLowerThan(versionThreshold);
