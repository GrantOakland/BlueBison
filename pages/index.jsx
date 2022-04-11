import ButtonLink from 'components/ButtonLink';
import { dbQuery } from 'lib/db';
import { sqlString } from 'lib/sql';
import { useUser } from 'lib/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Component = ({ statuses, tickets }) => {
	const router = useRouter();
	const me = useUser();

	return (
		<>
			<h1 style={{ fontSize: '45px' }}>
				Welcome to the Blue Bison Ticketing System
			</h1>

			<h3>
				{me ? (
					<ButtonLink href="/dashboard">Your Dashboard</ButtonLink>
				) : (
					<ButtonLink href="/login">Log In</ButtonLink>
				)}
			</h3>

			<br />
			<form>
				<label htmlFor="SearchTerm">
					Search a ticket by title or description:
				</label>
				<input type="text" id="SearchTerm" name="searchTerm" defaultValue={router.query.searchTerm} />
				<input type="submit" value="Submit" />
				{router.query.searchTerm !== undefined && (
					<ButtonLink href="/">Clear Search</ButtonLink>
				)}
			</form>

			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{tickets.map(({ TICKET_ID, TICKET_TITLE, TICKET_DESCRIPTION, STATUS_ID }) => (
						<tr key={TICKET_ID}>
							<td>
								<Link href={`/ticket/${TICKET_ID}`}>
									{TICKET_TITLE}
								</Link>
							</td>
							<td>{TICKET_DESCRIPTION}</td>
							<td>{statuses.find(status => status.STATUS_ID === STATUS_ID).STATUS_NAME}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Component;

export const getServerSideProps = async ({ query }) => ({
	props: {
		statuses: await dbQuery('SELECT * FROM STATUS'),
		tickets: await dbQuery(`
			SELECT T.TICKET_ID, T.TICKET_TITLE, T.TICKET_DESCRIPTION, S.STATUS_ID
			FROM TICKET AS T
			INNER JOIN (
				SELECT A.TICKET_ID, A.STATUS_ID
				FROM TICKET_STATUS AS A
				INNER JOIN (
					SELECT TICKET_ID, MAX(TICKET_STATUS_DATE) AS TICKET_STATUS_DATE
					FROM TICKET_STATUS
					GROUP BY TICKET_ID
				) AS B
				ON A.TICKET_ID = B.TICKET_ID AND A.TICKET_STATUS_DATE = B.TICKET_STATUS_DATE
			) AS S ON T.TICKET_ID = S.TICKET_ID
			${typeof query.searchTerm === 'string' ? `
				WHERE T.TICKET_TITLE LIKE ${sqlString(`%${query.searchTerm}%`)} OR T.TICKET_DESCRIPTION LIKE ${sqlString(`%${query.searchTerm}%`)}
			` : ''}
		`)
	}
});