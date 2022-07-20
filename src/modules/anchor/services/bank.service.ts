
export function createService() {
	async function createInvoice() {
		// send reference number to bank service
		return { _id: 'xyz123' };
	}

	return { createInvoice };
}
