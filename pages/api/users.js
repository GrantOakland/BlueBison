import { dbQuery } from 'lib/db';
import Cookies from 'cookies';
import { sqlString } from 'lib/sql';
import newID from 'lib/newID';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const userID = await newID('USER');

		const email = req.body.email.toLowerCase();

		if (
			(await dbQuery(`
				SELECT *
				FROM USER
				WHERE USER_EMAIL = ${sqlString(email)}
			`)).length !== 0
		) {
			res.status(422).send('A user with that email already exists.');
			return;
		}

		await dbQuery(`
			INSERT INTO USER VALUES (
				${userID},
				0,
				${sqlString(email)},
				${sqlString(req.body.password)},
				${sqlString(req.body.fname)},
				${sqlString(req.body.lname)}
			)
		`);
		await dbQuery(`
			INSERT INTO CUSTOMER VALUES (
				${userID},
				${sqlString(req.body.phone)},
				${sqlString(req.body.timeZone)}
			)
		`);

		const cookies = new Cookies(req, res);
		cookies.set('user', userID, {
			sameSite: 'strict',
			maxAge: 1000 * 60 * 60 * 24 * 7
		});

		res.status(201).end();
	}
}