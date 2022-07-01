import { Response as Res } from 'express';

export function defaultCatcher(e: any, res: Res) {
	console.error('-------------- default catcher', JSON.stringify(e));

	if (e.code === 11000) {
		return res.status(400).json({ error: 'Duplicate entry' });
	}

	if (e.code === 'NOT_FOUND') {
		return res.status(404).json({ error: e.message });
	}

	if (e._message?.includes('validation failed')) {
		return res.status(400).json({ error: e._message });
	}

	if (e.kind === 'ObjectId') {
		return res.status(400).json({ error: 'Invalid id' });
	}

	res.status(500).json({ error: e.message });
}
