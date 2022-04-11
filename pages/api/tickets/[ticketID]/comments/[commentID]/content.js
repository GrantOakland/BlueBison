import { dbQuery } from 'lib/db';
import getUserFromCookies from 'lib/getUserFromCookies';
import { sqlNumber, sqlString } from 'lib/sql';

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

	const [comment] = (await dbQuery(`
		SELECT *
		FROM COMMENT
		WHERE COMMENT_ID = ${sqlNumber(req.query.commentID)}
	`));

	if (!comment) {
		res.status(404).send('Comment not found');
		return;
	}

	if (req.method === 'PUT') {
		const me = await getUserFromCookies(req, res);

		if (me?.USER_ID !== comment.USER_ID) {
			res.status(403).send('You don\'t have permission to edit that comment.');
			return;
		}

		await dbQuery(`
			UPDATE COMMENT
			SET COMMENT_CONTENT = ${sqlString(req.body)}
			WHERE COMMENT_ID = ${sqlNumber(req.query.commentID)}
		`);

		res.end();
	}
}