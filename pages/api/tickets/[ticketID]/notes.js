import { dbQuery } from 'lib/db';
import getUserFromCookies from 'lib/getUserFromCookies';
import newID from 'lib/newID';
import { sqlDatetime, sqlNumber, sqlString } from 'lib/sql';

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

	if (req.method === 'PUT') {
		const me = await getUserFromCookies(req, res);

		if (!me?.USER_IS_TECHNICIAN) {
			res.status(403).send('You must be a technician to set a ticket\'s notes.');
			return;
		}

		await dbQuery(`
			UPDATE TICKET
			SET TICKET_NOTES = ${sqlString(req.body)}
			WHERE TICKET_ID = ${sqlNumber(req.query.ticketID)}
		`);

		res.status(201).end();
	}
}