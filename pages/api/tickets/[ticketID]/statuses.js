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

		const ticketStatusID = await newID('TICKET_STATUS');
		const now = Date.now();

		await dbQuery(`
			INSERT INTO TICKET_STATUS VALUES (
				${ticketStatusID},
				${sqlNumber(req.query.ticketID)},
				${sqlNumber(req.body.statusID)},
				${sqlDatetime(now)}
			)
		`);

		res.status(201).send({
			TICKET_STATUS_ID: ticketStatusID,
			STATUS_ID: sqlNumber(req.body.statusID),
			TICKET_STATUS_DATE: now
		});
	}
}