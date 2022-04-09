import ButtonLink from 'components/ButtonLink';

const Component = () => (
	<>
		<h1>Blue Bison Ticketing System.</h1>
		<h2>Hello %USER_FNAME%</h2>
		{/* SQL cmd to pull logged in users fname from USER table */}
		<form action="index.html">
			<input type="submit" value="Logout" />
		</form>
		<br />
		<table style={{ width: '100%' }}>
			<tr>
				<th>Submit a new ticket</th>
				<th>See your ticket history</th>
			</tr>
			<tr>
				{/* For this section, instead of redirecting to a new page. Let's see if we can display the results for view all closed tickets and see your ticket history here. */}
				<td>
					<ButtonLink href="/new-ticket">New Ticket!</ButtonLink>
				</td>
				<td>
					{/* Go to search page with a "created by you" filter */}
					<ButtonLink href="/search?something">See your history.</ButtonLink>
				</td>
			</tr>
		</table>
		<br />
		<ButtonLink href="/">Go Back Home</ButtonLink>
	</>
);

export default Component;