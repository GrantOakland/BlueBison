import ButtonLink from 'components/ButtonLink';
import TicketComment from 'components/TicketComment';
import UserLink from 'components/UserLink';
import { Field, Form, Formik } from 'formik';
import api from 'lib/api';
import { dbQuery } from 'lib/db';
import serialize from 'lib/serialize';
import { formatSQLDatetime, sqlNumber } from 'lib/sql';
import useFunction from 'lib/useFunction';
import { useUser } from 'lib/UserContext';
import { useState } from 'react';

const Component = ({ statuses, ticket, ticketStatuses: initialTicketStatuses, customer, technician: initialTechnician, comments: initialComments }) => {
	const [technician, setTechnician] = useState(initialTechnician);

	const me = useUser();

	const [ticketStatuses, setTicketStatuses] = useState(initialTicketStatuses);

	const [status, setStatus] = useState(ticketStatuses[ticketStatuses.length - 1].STATUS_ID);

	const changeStatus = useFunction(event => {
		setStatus(event.target.value);

		api.post(`/tickets/${ticket.TICKET_ID}/statuses`, {
			statusID: event.target.value
		});
	});

	const [ticketLevel, setTicketLevel] = useState(ticket.TICKET_LEVEL);

	const changeTicketLevel = useFunction(event => {
		setTicketLevel(event.target.value);

		api.put(`/tickets/${ticket.TICKET_ID}/level`, event.target.value);
	});

	const submitNotes = useFunction(values => {
		api.put(`/tickets/${ticket.TICKET_ID}/notes`, values.notes);
	});

	const changeAssignedTechnician = useFunction(async () => {
		const technicianID = prompt('Enter a technician ID to assign this ticket to.\n\nDefaults to yourself.', me.USER_ID);

		if (technicianID) {
			const { data: newTechnician } = await api.put(`/tickets/${ticket.TICKET_ID}/technician`, technicianID);

			setTechnician(newTechnician);
		}
	});

	const [comments, setComments] = useState(initialComments);

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
				{me.USER_IS_TECHNICIAN === 1 && (
					<>
						{' '}
						<button type="button" onClick={changeAssignedTechnician}>Change Assigned Technician</button>

						<br />
						<h3>Ticket Level:</h3>
						<span>
							<input
								type="number"
								min="1"
								max="99"
								value={ticketLevel}
								onChange={changeTicketLevel}
							/>
						</span>
						<br />

						<Formik
							initialValues={{
								notes: ticket.TICKET_NOTES
							}}
							onSubmit={submitNotes}
						>
							<Form>
								<h3><label htmlFor="notes">Technician Notes:</label></h3>
								<Field
									as="textarea"
									id="notes"
									name="notes"
									rows="10"
									cols="100"
									placeholder="Enter note details here..."
								/>
								<br />
								<input type="submit" value="Save Technician Notes" />
							</Form>
						</Formik>
					</>
				)}
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			<table>
				<thead>
					<tr>
						<th>Ticket History</th>
					</tr>
				</thead>
				<tbody>
					{[...comments, ...ticketStatuses].sort((a, b) => {
						const aDate = a.COMMENT_DATE ?? a.TICKET_STATUS_DATE;
						const bDate = b.COMMENT_DATE ?? b.TICKET_STATUS_DATE;

						return aDate - bDate;
					}).map(commentOrTicketStatus => (
						commentOrTicketStatus.COMMENT_ID ? (
							<TicketComment key={`comment-${commentOrTicketStatus.COMMENT_ID}`}>
								{commentOrTicketStatus}
							</TicketComment>
						) : (
							<tr key={`ticket-status-${commentOrTicketStatus.TICKET_STATUS_ID}`}>
								<td>
									{`Ticket status was set to ${statuses.find(status => status.STATUS_ID === commentOrTicketStatus.STATUS_ID).STATUS_NAME} at ${formatSQLDatetime(commentOrTicketStatus.TICKET_STATUS_DATE)}`}
								</td>
							</tr>
						)
					))}
				</tbody>
			</table>
			<br />
			<br />
			<Formik
				initialValues={{
					content: ''
				}}
				onSubmit={
					useFunction(async values => {
						const { data: comment } = await api.post(`/tickets/${ticket.TICKET_ID}/comments`, values);

						setComments([
							...comments,
							comment
						]);
					})
				}
			>
				<Form>
					<label htmlFor="comment-content"><b>Enter a New Comment:</b></label>
					<br />
					<Field
						as="textarea"
						id="comment-content"
						name="content"
						rows="10"
						cols="100"
						placeholder="Enter details here..."
						required
					/>
					<br />
					<input type="submit" value="Post Comment" />
				</Form>
			</Formik>
			<br />
			<br />
			<ButtonLink href="/">Go Back Home</ButtonLink>
		</>
	);
};

export default Component;

export const getServerSideProps = async ({ req, query }) => {
	const ticket = serialize((await dbQuery(`
		SELECT TICKET_ID, TICKET_TITLE, TICKET_DESCRIPTION, TICKET_LEVEL, CUSTOMER_ID, TECHNICIAN_ID${req.user.USER_IS_TECHNICIAN ? ', TICKET_NOTES' : ''}
		FROM TICKET
		WHERE TICKET_ID = ${sqlNumber(query.ticketID)}
	`))[0]);

	return {
		props: {
			statuses: await dbQuery('SELECT * FROM STATUS'),
			ticket,
			customer: (await dbQuery(`
				SELECT USER_ID, USER_FNAME, USER_LNAME, USER_IS_TECHNICIAN
				FROM USER
				WHERE USER_ID = ${ticket.CUSTOMER_ID}
			`))[0],
			technician: (await dbQuery(`
				SELECT USER_ID, USER_FNAME, USER_LNAME, USER_IS_TECHNICIAN
				FROM USER
				WHERE USER_ID = ${ticket.TECHNICIAN_ID}
			`))[0] || null,
			ticketStatuses: serialize(await dbQuery(`
				SELECT TICKET_STATUS_ID, STATUS_ID, TICKET_STATUS_DATE
				FROM TICKET_STATUS
				WHERE TICKET_ID = ${sqlNumber(query.ticketID)}
			`)),
			comments: serialize(await dbQuery(`
				SELECT COMMENT_ID, USER.USER_ID, USER_FNAME, USER_LNAME, USER_IS_TECHNICIAN, COMMENT_DATE, COMMENT_CONTENT
				FROM COMMENT
				INNER JOIN USER
				ON COMMENT.USER_ID = USER.USER_ID
				WHERE TICKET_ID = ${sqlNumber(query.ticketID)}
			`))
		}
	};
};