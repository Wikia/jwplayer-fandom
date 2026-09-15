import { useEffect, useState } from 'react';

interface ScriptOptions {
	id?: string;
	async?: boolean;
	className?: string;
	onLoad?: () => void;
}

export default function useScript(
	url: string,
	parentNode: HTMLElement,
	beforeLoad: () => void | null,
	scriptOptions: ScriptOptions,
) {
	const [scriptInjected, setScriptInjected] = useState(false);

	useEffect(() => {
		typeof beforeLoad === 'function' ? beforeLoad() : null;

		const script = document.createElement('script');

		script.src = url;
		script.async = scriptOptions.async ? scriptOptions.async : true;
		scriptOptions.id ? (script.id = scriptOptions.id) : null;
		scriptOptions.className ? (script.className = scriptOptions.className) : null;
		scriptOptions.onLoad ? (script.onload = scriptOptions.onLoad) : null;

		parentNode.appendChild(script);
		setScriptInjected(true);
	}, [url, parentNode]);

	return scriptInjected;
}
