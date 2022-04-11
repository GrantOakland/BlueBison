import './styles.module.scss';
import UserLink from '../UserLink';
import { formatSQLDatetime } from 'lib/sql';
import { useState } from 'react';
import useFunction from 'lib/useFunction';
import api from 'lib/api';
import { useUser } from 'lib/UserContext';

const TicketComment = ({ children: comment }) => {
	const me = useUser();

	const [content, setContent] = useState(comment.COMMENT_CONTENT);

	const [deleted, setDeleted] = useState(false);

	const editComment = useFunction(async () => {
		const newContent = prompt('Enter the new comment content:', content);

		if (newContent) {
			await api.put(`/tickets/${comment.TICKET_ID}/comments/${comment.COMMENT_ID}/content`, newContent);

			setContent(newContent);
		}
	});

	const deleteComment = useFunction(async () => {
		if (confirm(`Are you sure you want to delete the following comment by ${comment.USER_FNAME} ${comment.USER_LNAME}?\n\n${comment.COMMENT_CONTENT}`)) {
			await api.delete(`/tickets/${comment.TICKET_ID}/comments/${comment.COMMENT_ID}`);

			setDeleted(true);
		}
	});

	return deleted ? null : (
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
				<p className="comment-content">
					{content}
				</p>
				{comment.USER_ID === me?.USER_ID && (
					<button type="button" onClick={editComment}>
						Edit
					</button>
				)}
				{me?.USER_IS_TECHNICIAN === 1 && (
					<button type="button" onClick={deleteComment}>
						Delete
					</button>
				)}
			</td>
		</tr>
	);
};

export default TicketComment;