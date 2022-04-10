import ButtonLink from 'components/ButtonLink';
import { dbQuery } from 'lib/db';
import { sqlNumber } from 'lib/sql';

const Component = ({ user }) => (
	<>
		<table>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Email Address</th>
				<th>Technician Level</th>
				<th>User ID</th>
			</tr>
			<tr>
				<td>{user.USER_FNAME}</td>
				<td>{user.USER_LNAME}</td>
				<td>{user.USER_EMAIL || 'N/A'}</td>
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
);

export default Component;

export const getServerSideProps = async ({ query }) => ({
	props: {
		user: (await dbQuery(`
			SELECT U.USER_ID, USER_FNAME, USER_LNAME, TECHNICIAN_LEVEL
			FROM USER AS U
			INNER JOIN TECHNICIAN AS T
			ON U.USER_ID = T.USER_ID
			WHERE U.USER_ID = ${sqlNumber(query.userID)}
		`))[0]
	}
});