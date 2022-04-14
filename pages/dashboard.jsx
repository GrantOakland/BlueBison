import ButtonLink from 'components/ButtonLink';
import api from 'lib/api';
import useFunction from 'lib/useFunction';
import { useUser } from 'lib/UserContext';

const Component = () => {
	const me = useUser();

	const logOut = useFunction(() => {
		api.delete('/login').then(() => {
			location.href = '/';
		});
	});

	return (
		me ? (
			<>
				<h1>Blue Bison Ticketing System.</h1>
				<h2>Hello {me.USER_FNAME}</h2>
				{/* SQL cmd to pull logged in users fname from USER table */}
				<button type="button" onClick={logOut}>
					Log out
				</button>
				<br />
				<br />
				<table style={{ width: '100%' }}>
					<tr>
						<th>Your profile</th>
						{!me.USER_IS_TECHNICIAN && (
							<th>Submit a new ticket</th>
						)}
					</tr>
					<tr>
						<td>
							<ButtonLink href={`/${me.USER_IS_TECHNICIAN ? 'technician' : 'customer'}/${me.USER_ID}`}>Visit your profile.</ButtonLink>
						</td>
						{!me.USER_IS_TECHNICIAN && (
							<td>
								<ButtonLink href="/ticket/new">New Ticket!</ButtonLink>
							</td>
						)}
					</tr>
				</table>
				<br />
				<ButtonLink href="/">Go Back Home</ButtonLink>
			</>
		) : (
			<>
				You are not signed in.
				<br />
				<br />
				<ButtonLink href="/">Go Back Home</ButtonLink>
			</>
		)
	);
};

export default Component;