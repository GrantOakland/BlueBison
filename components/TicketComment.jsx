import UserLink from './UserLink';
import { formatSQLDatetime } from 'lib/sql';
import { useState } from 'react';

const TicketComment = ({ children: comment }) => {
	const [content, setContent] = useState(comment.COMMENT_CONTENT);

	return (
		<tr>
			<td>
				<UserLink>
					{{
						USER_ID: comment.USER_ID,
						USER_FNAME: comment.USER_FNAME,
						USER_LNAME: comment.USER_LNAME,
						USER_IS_TECHNICIAN: comment.USER_IS_TECHNICIAN
					}}
				</UserLink>
				{` posted a comment at ${formatSQLDatetime(comment.COMMENT_DATE)}`}
				<p>
					{content}
				</p>
				<button type="button">Edit</button>
				<button type="button">Delete</button>
			</td>
		</tr>
	);
};

export default TicketComment;