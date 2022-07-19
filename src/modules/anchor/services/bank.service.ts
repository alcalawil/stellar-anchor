
export function createService() {
	async function createInvoice() {
		return { _id: 'xyz123' };
	}

	return { createInvoice };
}
