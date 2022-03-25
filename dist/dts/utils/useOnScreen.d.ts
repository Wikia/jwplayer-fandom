import { MutableRefObject } from 'react';
export default function useOnScreen<T extends Element>(ref: MutableRefObject<T>, rootMargin?: string): boolean;
