import { UserContext } from '@fandom/context';

export default function isUserAnon() {
	const context = UserContext.fromWindow();
	return context?.isAnon === true;
}
