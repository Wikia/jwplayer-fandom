interface waitForEventDescription {
	eventCheck: () => boolean;
	maxWaitTime?: number;
	intervalTime?: number;
	onResolve?: () => unknown;
	onReject?: () => unknown;
}

export default function waitFor(event: waitForEventDescription) {
	const { eventCheck, maxWaitTime, intervalTime } = event;

	const maxIntervalTime = intervalTime || 100;
	const defaultWaitTime = maxWaitTime || 2000;
	const defaultOnResolve = () => true;
	const defaultOnReject = () => false;

	const onResolve = event?.onResolve || defaultOnResolve;
	const onReject = event?.onReject || defaultOnReject;

	let intervals = 0;

	return () =>
		new Promise((resolve, reject) => {
			if (typeof eventCheck !== 'function') {
				reject('eventCheck is not a function');
			}

			const intervalId = setInterval(() => {
				if (eventCheck()) {
					clearInterval(intervalId);
					resolve(onResolve());
				}

				if (maxIntervalTime * intervals > defaultWaitTime) {
					clearInterval(intervalId);
					reject(onReject());
				}

				intervals++;
			}, maxIntervalTime);
		});
}
