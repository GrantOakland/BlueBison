import { dbQuery } from 'lib/db';
import getUserFromCookies from 'lib/getUserFromCookies';
import newID from 'lib/newID';
import { sqlDatetime, sqlNumber } from 'lib/sql';

export default async function handler(req, res) {
	if (
		(await dbQuery(`
			SELECT *
			FROM TICKET
			WHERE TICKET_ID = ${sqlNumber(req.query.ticketID)}
		`)).length === 0
	) {
		res.status(404).send('Ticket not found');
		return;
	}

	if (
		(await dbQuery(`
			SELECT *
			FROM STATUS
			WHERE STATUS_ID = ${sqlNumber(req.body.statusID)}
		`)).length === 0
	) {
		res.status(404).send('Status not found');
		return;
	}

	if (req.method === 'POST') {
		const me = await getUserFromCookies(req, res);

		if (!me?.USER_IS_TECHNICIAN) {
			res.status(403).send('You must be a technician to set a ticket\'s status.');
			return;
		}

		await dbQuery(`
			INSERT INTO TICKET_STATUS VALUES (
				${await newID('TICKET_STATUS')},
				${sqlNumber(req.query.ticketID)},
				${sqlNumber(req.body.statusID)},
				${sqlDatetime(Date.now())}
			)
		`);

		res.status(201).end();
	}
}