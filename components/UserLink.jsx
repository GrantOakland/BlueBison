import Link from 'next/link';

const UserLink = ({ children: user }) => (
	<Link href={`/${user.USER_IS_TECHNICIAN ? 'technician' : 'customer'}/${user.USER_ID}`}>
		{`${user.USER_FNAME} ${user.USER_LNAME}`}
	</Link>
);

export default UserLink;