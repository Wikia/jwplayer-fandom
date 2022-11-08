import { useEffect, useRef, useState } from 'react';

const useStateRef = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const ref = useRef(value);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return [value, setValue, ref];
};

export default useStateRef;
