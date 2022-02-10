// wait for something to happen
export default function waitForEvent<T = void>(options: {
	eventCheck: () => boolean;
	maxWaitTime: number;
	intervalTime: number;
	onResolve?: () => T;
	onReject?: () => T;
}): () => Promise<T> {
	let intervals = 0;

	return () =>
		new Promise((resolve, reject) => {
			const intervalID = setInterval(() => {
				if (options.eventCheck()) {
					clearInterval(intervalID);
					resolve(options?.onResolve());
				}

				if (options.intervalTime * intervals > options.maxWaitTime) {
					clearInterval(intervalID);
					reject(options?.onReject());
				}

				intervals++;
			}, options.intervalTime);
		});
}
