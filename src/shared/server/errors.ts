export const BadRequestError = (_message = '') => ({
	statusCode: 400,
	code: 'BAD_REQUEST',
	message: 'Invalid Payload: ' + _message
});
