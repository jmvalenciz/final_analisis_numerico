type CallbackFN = (message: NotificationMessage) => void;

export type NotificationMessage = {
	title: string;
	body: string;
	type: "error" | "info" | "success";
};

class NotificationController {
	observers: CallbackFN[] = [];

	constructor() {}

	send(message: NotificationMessage) {
		for (let callback of this.observers) {
			callback(message);
		}
	}

	subscibe(callback: CallbackFN) {
		this.observers.push(callback);
		return {
			unsubscribe: () => this.#unsubscribe(callback),
		};
	}

	#unsubscribe(callback: CallbackFN) {
		this.observers = this.observers.filter((o) => o !== callback);
	}
}

export default new NotificationController();
