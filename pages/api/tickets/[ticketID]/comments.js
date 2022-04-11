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

	if (req.method === 'POST') {
		const me = await getUserFromCookies(req, res);

		if (!me) {
			res.status(403).send('You must be signed in to post a comment.');
			return;
		}

		const now = Date.now();

		await dbQuery(`
			INSERT INTO COMMENT VALUES (
				${await newID('COMMENT')},
				${me.USER_ID},
				${sqlNumber(req.query.ticketID)},
				${sqlDatetime(now)},
				${sqlString(req.body.content)}
			)
		`);

		res.status(201).send({
			COMMENT_ID: req.body.content,
			USER_ID: me.USER_ID,
			USER_FNAME: me.USER_FNAME,
			USER_LNAME: me.USER_LNAME,
			USER_IS_TECHNICIAN: me.USER_IS_TECHNICIAN,
			COMMENT_DATE: now,
			COMMENT_CONTENT: req.body.content
		});
	}
}