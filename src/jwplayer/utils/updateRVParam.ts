export function updateRVParam(adTagUrl: string, rv: number) {
	const [url, params] = adTagUrl.split('?');
	const searchParamsArray = params.split('&');
	const newSearchParamsArray = searchParamsArray.map((param) => {
		if (param.startsWith('cust_params')) {
			const customParamsArray = param.split('=');
			const customParams = customParamsArray[1].split('%26');
			let rvSet = false;
			const newCustomParams = customParams.map((customParam) => {
				if (customParam.startsWith('rv')) {
					rvSet = true;
					return `rv%3D${rv}`;
				}

				return customParam;
			});

			if (!rvSet) {
				newCustomParams.push(`rv%3D${rv}`);
			}

			return `cust_params=${newCustomParams.join('%26')}`;
		}

		return param;
	});

	return url + '?' + newSearchParamsArray.join('&');
}
