import UserLink from './UserLink';
import { formatSQLDatetime } from 'lib/sql';
import { useState } from 'react';
import useFunction from 'lib/useFunction';
import api from 'lib/api';
import { useUser } from 'lib/UserContext';

const TicketComment = ({ children: comment }) => {
	const me = useUser();

	const [content, setContent] = useState(comment.COMMENT_CONTENT);

	const editComment = useFunction(async () => {
		const newContent = prompt('Enter the new comment content:', content);

		if (newContent) {
			await api.put(`/tickets/${comment.TICKET_ID}/comments/${comment.COMMENT_ID}/content`, newContent);

			setContent(newContent);
		}
	});



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
				{comment.USER_ID === me.USER_ID && (
					<button type="button" onClick={editComment}>
						Edit
					</button>
				)}
				<button type="button">Delete</button>
			</td>
		</tr>
	);
};

export default TicketComment;