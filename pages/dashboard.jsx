import ButtonLink from 'components/ButtonLink';
import api from 'lib/api';
import useFunction from 'lib/useFunction';
import Router from 'next/router';

const Component = () => (
	<>
		<h1>Blue Bison Ticketing System.</h1>
		<h2>Hello %USER_FNAME%</h2>
		{/* SQL cmd to pull logged in users fname from USER table */}
		<button
			onClick={
				useFunction(() => {
					api.delete('/login').then(() => {
						Router.push('/');
					});
				})
			}
		>
			Log out
		</button>
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
					<ButtonLink href={`/?user=${'user.USER_ID'}`}>See your history.</ButtonLink>
				</td>
			</tr>
		</table>
		<br />
		<ButtonLink href="/">Go Back Home</ButtonLink>
	</>
);

export default Component;