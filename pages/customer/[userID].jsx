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
				{user.CUSTOMER_PHONE && (
					<th>Phone</th>
				)}
				{user.CUSTOMER_TIME_ZONE && (
					<th>Time Zone</th>
				)}
				<th>User ID</th>
			</tr>
			<tr>
				<td>{user.USER_FNAME}</td>
				<td>{user.USER_LNAME}</td>
				{user.USER_EMAIL && (
					<td>{user.USER_EMAIL}</td>
				)}
				{user.CUSTOMER_PHONE && (
					<td>{user.CUSTOMER_PHONE}</td>
				)}
				{user.CUSTOMER_TIME_ZONE && (
					<td>{user.CUSTOMER_TIME_ZONE}</td>
				)}
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

export const getServerSideProps = withStatusCode(async ({ req, query }) => {
	const [user] = await dbQuery(`
		SELECT U.USER_ID, USER_FNAME, USER_LNAME${req.user.USER_ID === +query.userID || req.user.USER_IS_TECHNICIAN ? ', USER_EMAIL, CUSTOMER_PHONE, CUSTOMER_TIME_ZONE' : ''}
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