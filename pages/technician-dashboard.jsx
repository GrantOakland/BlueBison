import ButtonLink from 'components/ButtonLink';

const Component = () => (
	<>
		<table style={{ width: '100%', backgroundColor: 'darkturquoise' }}>
			<tr>
				<th>Status</th>
				<th>Title</th>
				<th>Brief Description</th>
				<th>Assign Myself</th>
				<th>Go To Ticket</th>
			</tr>
			{/* Will need to put SQL cmds here to pull ticket view list. Along with a button that will assign the logged in tech to that ticket.*/}
			<br />
			{/* Maybe a for each loop here?*/}
			<tr>
				<th />
				<th />
				<th />
				<th />
				<th>
					<ButtonLink href="/ticket?something">Go to Ticket</ButtonLink>
				</th>
			</tr>
		</table>
		<br />
		<ButtonLink href="/">Go Back Home</ButtonLink>
	</>
);

export default Component;