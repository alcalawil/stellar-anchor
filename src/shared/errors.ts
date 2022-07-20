export const RESOURCE_NOT_FOUND = (message = '', fireFrom = '') => ({
	message: 'Resource not found - ' + message,
	code: 'NOT_FOUND',
	function: fireFrom
});
