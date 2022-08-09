import { getContextFromWindow } from '@fandom/context';

export default function isUserAnon(): boolean {
	const context = getContextFromWindow();

	return context.user.isAnon === true;
}
