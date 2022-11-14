const isServerSide = () => {
	return typeof window === undefined;
};

const isClientSide = () => {
	return !isServerSide();
};

const isLocalhost = () => {
	if (!isClientSide()) {
		return false;
	}
	return /^localhost/.test(window?.location.hostname) || window?.location.hostname === '127.0.0.1';
};

const isOnDevDomain = () => {
	if (!isClientSide()) {
		return false;
	}
	return /fandom-dev\.(pl|us)$/.test(window?.location.hostname);
};

const isNonProd = () => {
	return isLocalhost() || isOnDevDomain();
};

export { isServerSide, isClientSide, isLocalhost, isOnDevDomain, isNonProd };
