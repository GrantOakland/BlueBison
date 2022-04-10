import Link from 'next/link';

const UserLink = ({ children: user, type }) => (
	<Link href={`/${type}/${user.USER_ID}`}>
		{`${user.USER_FNAME} ${user.USER_LNAME}`}
	</Link>
);

export default UserLink;