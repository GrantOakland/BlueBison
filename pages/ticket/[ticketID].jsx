import ButtonLink from 'components/ButtonLink';
import UserLink from 'components/UserLink';
import api from 'lib/api';
import { dbQuery } from 'lib/db';
import serialize from 'lib/serialize';
import { sqlNumber } from 'lib/sql';
import useFunction from 'lib/useFunction';
import { useUser } from 'lib/UserContext';
import { useState } from 'react';

const Component = ({ statuses, ticket, ticketStatuses, customer, technician }) => {
	const me = useUser();
	console.log(me);

	const [status, setStatus] = useState(ticketStatuses[ticketStatuses.length - 1].STATUS_ID);

	const changeStatus = useFunction(event => {
		setStatus(event.target.value);

		api.post(`/tickets/${ticket.TICKET_ID}/statuses`, {
			statusID: event.target.value
		});
	});

	return (
		<>
			<div>

				<h2>Ticket Number:</h2>
				<span>{ticket.TICKET_ID}</span>
			</div>
			<br />
			<div>
				<h3>Title:</h3>
				<span>{ticket.TICKET_TITLE}</span>
				<br />
				<h3>Description:</h3>
				<span>{ticket.TICKET_DESCRIPTION}</span>
				<br />
				<h3>Status:</h3>
				<span>
					{me.USER_IS_TECHNICIAN ? (
						<select
							value={status}
							onChange={changeStatus}
						>
							{statuses.map(status => (
								<option key={status.STATUS_ID} value={status.STATUS_ID}>
									{status.STATUS_NAME}
								</option>
							))}
						</select>
					) : (
						statuses.find(status => status.STATUS_ID === ticketStatuses[ticketStatuses.length - 1].STATUS_ID).STATUS_NAME
					)}
				</span>
				{/* Will need to make this a dropdown */}
				<br />
				<h3>Reported By:</h3>
				<span><UserLink type="customer">{customer}</UserLink></span>
				<br />
				<h3>Assigned To:</h3>
				<span>
					{technician ? (
						<UserLink type="technician">{technician}</UserLink>
					) : (
						'N/A'
					)}
				</span>

				<h3>Technician Notes:</h3>
				<textarea
					id="NoteContent"
					name="NoteContent"
					rows="10"
					cols="100"
					placeholder="Enter note details here..."
					defaultValue={ticket.TICKET_NOTES}
				/>
				<br />
				<form action="TechView.html">
					<input type="submit" name="NoteContent" value="Save Technician Notes" required />
				</form>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			<table>
				<tr>
					<th>Ticket History</th>
				</tr>
				<tr>
					<td>
						{/* Pull notes from database */}
					</td>
				</tr>
			</table>
			<br />
			<br />
			<div />
			<label htmlFor="CommentContent"><b>Enter a New Comment:</b></label>
			<br />
			<textarea
				id="CommentContent"
				name="CommentContent"
				rows="10"
				cols="100"
				placeholder="Enter details here..."
			/>
			<br />
			<form action="TechView.html">
				<input type="submit" name="CommentContent" value="Post Comment" required />
			</form>
			<br />
			<br />
			<ButtonLink href="/">Go Back Home</ButtonLink>
		</>
	);
}

export default Component;

export const getServerSideProps = async ({ query }) => {
	const ticket = serialize((await dbQuery(`
		SELECT *
		FROM TICKET
		WHERE TICKET_ID = ${sqlNumber(query.ticketID)}
	`))[0]);

	return {
		props: {
			statuses: await dbQuery('SELECT * FROM STATUS'),
			ticket,
			customer: (await dbQuery(`
				SELECT USER_ID, USER_FNAME, USER_LNAME
				FROM USER
				WHERE USER_ID = ${ticket.CUSTOMER_ID}
			`))[0],
			technician: (await dbQuery(`
				SELECT USER_ID, USER_FNAME, USER_LNAME
				FROM USER
				WHERE USER_ID = ${ticket.TECHNICIAN_ID}
			`))[0] || null,
			ticketStatuses: serialize(await dbQuery(`
				SELECT STATUS_ID, TICKET_STATUS_DATE
				FROM TICKET_STATUS
				WHERE TICKET_ID = ${sqlNumber(query.ticketID)}
				ORDER BY TICKET_STATUS_DATE ASC
			`))
		}
	};
};