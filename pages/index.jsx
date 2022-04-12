import './styles.module.scss';
import ButtonLink from 'components/ButtonLink';
import { dbQuery } from 'lib/db';
import { sqlString } from 'lib/sql';
import { useUser } from 'lib/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Component = ({ statuses, tickets }) => {
	const router = useRouter();
	const me = useUser();

	let noStatusesChecked = true;
	for (const status of statuses) {
		if (`status${status.STATUS_ID}` in router.query) {
			noStatusesChecked = false;
			break;
		}
	}

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
			<form style={{ lineHeight: 1.75 }}>
				<label htmlFor="search-term">
					{'Search a ticket by title or description: '}
				</label>
				<input type="text" id="search-term" name="searchTerm" defaultValue={router.query.searchTerm} />
				<br />
				Status:
				{statuses.map(status => (
					<span key={status.STATUS_ID} className="status-filter">
						<input
							type="checkbox"
							id={`status-filter-${status.STATUS_ID}`}
							name={`status${status.STATUS_ID}`}
							defaultChecked={noStatusesChecked || `status${status.STATUS_ID}` in router.query}
						/>
						<label htmlFor={`status-filter-${status.STATUS_ID}`}> {status.STATUS_NAME}</label>
					</span>
				))}
				<br />
				{'Sort by: '}
				<select name="sort" defaultValue={router.query.sort}>
					<option value="newest">Newest First</option>
					<option value="oldest">Oldest First</option>
				</select>
				<br />
				<input type="submit" value="Submit" />
				{router.query.searchTerm !== undefined && (
					<ButtonLink href="/">Clear Search</ButtonLink>
				)}
			</form>
			<br />

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

export const getServerSideProps = async ({ query }) => {
	const whereClauses = [];

	if (typeof query.searchTerm === 'string') {
		whereClauses.push(`
			T.TICKET_TITLE LIKE ${sqlString(`%${query.searchTerm}%`)} OR T.TICKET_DESCRIPTION LIKE ${sqlString(`%${query.searchTerm}%`)}
		`);
	}

	const statuses = await dbQuery('SELECT * FROM STATUS');

	const queriedStatuses = statuses.filter(status => `status${status.STATUS_ID}` in query);

	// Check if they're filtering out any statuses.
	if (statuses.length !== queriedStatuses.length && queriedStatuses.length !== 0) {
		whereClauses.push(`S.STATUS_ID IN (${queriedStatuses.map(status => status.STATUS_ID).join(',')})`);
	}

	return {
		props: {
			statuses,
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
				${whereClauses.length ? `
					WHERE ${whereClauses.map(clause => `(${clause})`).join(' AND ')}
				` : ''}
				ORDER BY T.TICKET_DATE ${query.sort === 'oldest' ? 'ASC' : 'DESC'}
			`)
		}
	};
};