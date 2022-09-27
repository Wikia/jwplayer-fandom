// Source: https://usehooks.com/useOnScreen/
import { useState, useEffect, MutableRefObject } from 'react';

export default function useOnScreen<T extends Element>(
	ref: MutableRefObject<T>,
	rootMargin = '0px',
	threshold = 0,
): boolean {
	// State and setter for storing whether element is visible
	const [isIntersecting, setIntersecting] = useState<boolean>(false);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// Update our state when observer callback fires
				if (ref.current) {
					setIntersecting(entry.isIntersecting);
				}
			},
			{
				rootMargin,
				threshold,
			},
		);
		if (ref.current) {
			observer.observe(ref.current);
		}
		return () => {
			observer.disconnect();
		};
	}, []); // Empty array ensures that effect is only run on mount and unmount
	return isIntersecting;
}
