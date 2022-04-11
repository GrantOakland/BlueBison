import { dbQuery } from 'lib/db';
import getUserFromCookies from 'lib/getUserFromCookies';
import newID from 'lib/newID';
import { sqlDatetime, sqlString } from 'lib/sql';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const me = await getUserFromCookies(req, res);

		if (!me) {
			res.status(403).send('You must be signed in to create a ticket.');
			return;
		}

		const ticketID = await newID('TICKET');
		const now = Date.now();

		await dbQuery(`
			INSERT INTO TICKET VALUES (
				${ticketID},
				${sqlDatetime(now)},
				${sqlString(req.body.title)},
				${sqlString(req.body.description)},
				NULL,
				${me.USER_ID},
				1,
				NULL
			)
		`);

		await dbQuery(`
			INSERT INTO TICKET_STATUS VALUES (
				${await newID('TICKET_STATUS')},
				${ticketID},
				1,
				${sqlDatetime(now)}
			)
		`);

		res.status(201).send(ticketID);
	}
}