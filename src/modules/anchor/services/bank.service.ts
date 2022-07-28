import * as uuid from "uuid";

export function createService() {
	async function createInvoice() {
		// send reference number to bank service
		return { _id: uuid.v4() };
	}

	return { createInvoice };
}
