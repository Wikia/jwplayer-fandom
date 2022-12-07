export function isOnBrowser() {
	return typeof window !== 'undefined';
}

export function isLocalDevelopment() {
	return process.env.NODE_ENV !== 'production';
}

export function isOnProdDomain() {
	return /fandom\.com$/.test(window.location.hostname);
}

export function isOnDevDomain() {
	return /fandom-dev\.(pl|us)$/.test(window.location.hostname);
}
