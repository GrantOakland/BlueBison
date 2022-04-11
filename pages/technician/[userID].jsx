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
				{user.USER_EMAIL && (
					<th>Email Address</th>
				)}
				<th>Technician Level</th>
				<th>User ID</th>
			</tr>
			<tr>
				<td>{user.USER_FNAME}</td>
				<td>{user.USER_LNAME}</td>
				{user.USER_EMAIL && (
					<td>{user.USER_EMAIL}</td>
				)}
				<td>{user.TECHNICIAN_LEVEL}</td>
				<td>{user.USER_ID}</td>
			</tr>
		</table>
		<br />
		<ButtonLink href={`/?technician=${user.USER_ID}`}>View assigned tickets</ButtonLink>
		<br />
		<br />
		<br />
		<ButtonLink href="/">Go Back Home</ButtonLink>
	</>
));

export default Component;

export const getServerSideProps = withStatusCode(async ({ req, query }) => ({
	props: {
		user: (await dbQuery(`
			SELECT U.USER_ID, USER_FNAME, USER_LNAME, TECHNICIAN_LEVEL${req.user.USER_ID === +query.userID || req.user.USER_IS_TECHNICIAN ? ', USER_EMAIL' : ''}
			FROM USER AS U
			INNER JOIN TECHNICIAN AS T
			ON U.USER_ID = T.USER_ID
			WHERE U.USER_ID = ${sqlNumber(query.userID)}
		`))[0]
	}
}));