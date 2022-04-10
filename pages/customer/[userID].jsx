import ButtonLink from 'components/ButtonLink';
import { dbQuery } from 'lib/db';
import { sqlNumber } from 'lib/sql';
import withErrorPage from 'lib/withErrorPage';
import withStatusCode from 'lib/withStatusCode';

const Component = withErrorPage(({ user }) => (
	<>
		<table>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email Address</th>
				<th>User ID</th>
			</tr>
			<tr>
				<td>{user.USER_FNAME}</td>
				<td>{user.USER_LNAME}</td>
				<td>{user.USER_EMAIL || 'N/A'}</td>
				<td>{user.USER_ID}</td>
			</tr>
		</table>
		<br />
		<ButtonLink href={`/?customer=${user.USER_ID}`}>View ticket history</ButtonLink>
		<br />
		<br />
		<br />
		<ButtonLink href="/">Go Back Home</ButtonLink>
	</>
));

export default Component;

export const getServerSideProps = withStatusCode(async ({ query }) => {
	const [user] = await dbQuery(`
		SELECT U.USER_ID, USER_FNAME, USER_LNAME
		FROM USER AS U
		INNER JOIN CUSTOMER AS C
		ON U.USER_ID = C.USER_ID
		WHERE U.USER_ID = ${sqlNumber(query.userID)}
	`);

	if (!user) {
		return {
			props: { statusCode: 404 }
		};
	}

	return {
		props: { user }
	};
});