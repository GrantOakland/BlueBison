import { dbQuery } from 'lib/db';
import getUserFromCookies from 'lib/getUserFromCookies';
import { sqlNumber } from 'lib/sql';

export default async function handler(req, res) {
	const [ticket] = await dbQuery(`
		SELECT *
		FROM TICKET
		WHERE TICKET_ID = ${sqlNumber(req.query.ticketID)}
	`);

	if (!ticket) {
		res.status(404).send('Ticket not found');
		return;
	}

	if (req.method === 'PUT') {
		const me = await getUserFromCookies(req, res);

		if (!me?.USER_IS_TECHNICIAN) {
			res.status(403).send('You must be a technician to set a ticket\'s assignee.');
			return;
		}

		const technician = (await dbQuery(`
			SELECT USER_ID, USER_FNAME, USER_LNAME
			FROM USER
			WHERE USER_ID = ${sqlNumber(req.body)}
		`))[0];

		if (!technician) {
			res.status(422).send('The specified technician does not exist.');
			return;
		}

		const technicianLevel = (await dbQuery(`
			SELECT TECHNICIAN_LEVEL
			FROM TECHNICIAN
			WHERE USER_ID = ${sqlNumber(req.body)}
		`))[0].TECHNICIAN_LEVEL;

		if (technicianLevel < ticket.TICKET_LEVEL) {
			res.status(422).send(`The specified technician's level (${technicianLevel}) is below the ticket's level (${ticket.TICKET_LEVEL}).`);
			return;
		}

		await dbQuery(`
			UPDATE TICKET
			SET TECHNICIAN_ID = ${sqlNumber(req.body)}
			WHERE TICKET_ID = ${sqlNumber(req.query.ticketID)}
		`);

		res.send(technician);
	}
}