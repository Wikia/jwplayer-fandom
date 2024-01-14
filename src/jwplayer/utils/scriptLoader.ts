class ScriptLoader {
	createScript(
		src: string,
		type = 'text/javascript',
		isAsync = true,
		node: HTMLElement | string = null,
		parameters: Record<string, string> = {},
		datasets: Partial<DOMStringMap> = {},
	): HTMLScriptElement {
		const script: HTMLScriptElement = document.createElement('script');

		script.async = isAsync;
		script.type = type;
		script.src = src;

		Object.keys(parameters).forEach((parameter) => {
			script.setAttribute(parameter, parameters[parameter]);
		});

		Object.keys(datasets).forEach((dataset) => {
			script.dataset[dataset] = datasets[dataset];
		});

		if (typeof node === 'string') {
			const temp: ChildNode = document.getElementsByTagName('script')[0];

			temp.parentNode.insertBefore(script, temp);
		} else {
			const temp: ChildNode = node || document.body;

			temp.appendChild(script);
		}

		return script;
	}

	loadScript(
		src: string,
		type = 'text/javascript',
		isAsync = true,
		node: HTMLElement | string = null,
		parameters: Record<string, string> = {},
		datasets: Partial<DOMStringMap> = {},
	): Promise<Event> {
		return new Promise((resolve, reject) => {
			const script: HTMLScriptElement = this.createScript(src, type, isAsync, node, parameters, datasets);

			script.onload = resolve;
			script.onerror = reject;
		});
	}
}

export const scriptLoader = new ScriptLoader();
