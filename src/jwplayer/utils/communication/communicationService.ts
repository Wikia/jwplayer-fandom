import { Communicator, setupPostQuecast, Action } from '@wikia/post-quecast';

type EventListener<P> = (payload?: Action<P>) => void;

class CommunicationService {
	private history = new Map<string, boolean>();
	private communicator: Communicator;

	constructor() {
		setupPostQuecast();
		this.communicator = new Communicator();
	}

	dispatch(action) {
		this.communicator.dispatch({ ...action, __global: true });
	}

	on<P = unknown>(actionType: string, callback: EventListener<P>): void {
		this.communicator.addListener((action: Action<P>) => this.run(action, actionType, callback));
	}

	once<P = unknown>(actionType: string, callback: EventListener<P>): void {
		this.communicator.addListener((action: Action<P>) => this.runOnce(action, actionType, callback));
	}

	private run<P>(action: Action<P>, actionType: string, callback: EventListener<P>): void {
		if (this.ofType(action, actionType)) {
			callback(action);
		}
	}

	private runOnce<P>(action: Action<P>, actionType: string, callback: EventListener<P>): void {
		if (!this.ofType(action, actionType)) {
			return;
		}

		if (this.history.has(actionType)) {
			return callback(action);
		}

		this.history.set(actionType, true);

		callback(action);
	}

	private ofType<P>(action: Action<P>, actionType: string): boolean {
		return action.type === actionType;
	}
}

let communicationService: CommunicationService = null;

export function getCommunicationService(): CommunicationService {
	if (communicationService === null) {
		communicationService = new CommunicationService();
	}
	return communicationService;
}
