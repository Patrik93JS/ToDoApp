import { useEffect, useState } from "react";

export const useBodyRef = () => {
	const [bodyRef, setBodyRef] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setBodyRef(document.body);
	}, []);

	return bodyRef;
};
