import { dbQuery } from 'lib/db';
import Cookies from 'cookies';
import { sqlString } from 'lib/sql';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const [user] = await dbQuery(`
			SELECT USER_ID, USER_PASSWORD
			FROM USER
			WHERE USER_EMAIL = ${sqlString(req.body.email)}
		`);

		if (!user) {
			res.status(404).send('User not found');
			return;
		}

		if (user.USER_PASSWORD !== req.body.password) {
			res.status(401).send('Wrong password');
			return;
		}

		const cookies = new Cookies(req, res);
		cookies.set('user', user.USER_ID, {
			sameSite: 'strict',
			maxAge: 1000 * 60 * 60 * 24 * 7
		});

		res.send(user.USER_ID);
		return;
	}

	if (req.method === 'DELETE') {
		const cookies = new Cookies(req, res);
		cookies.set('user', undefined);

		res.status(204).end();
	}
}