import { dbQuery } from 'lib/db';
import getUserFromCookies from 'lib/getUserFromCookies';
import { sqlNumber } from 'lib/sql';

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
			FROM COMMENT
			WHERE COMMENT_ID = ${sqlNumber(req.query.commentID)}
		`)).length === 0
	) {
		res.status(404).send('Comment not found');
		return;
	}

	if (req.method === 'DELETE') {
		const me = await getUserFromCookies(req, res);

		if (!me?.USER_IS_TECHNICIAN) {
			res.status(403).send('You don\'t have permission to delete that comment.');
			return;
		}

		await dbQuery(`
			DELETE FROM COMMENT
			WHERE COMMENT_ID = ${sqlNumber(req.query.commentID)}
		`);

		res.end();
	}
}