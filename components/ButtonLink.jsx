import useFunction from 'lib/useFunction';
import Router from 'next/router';

const ButtonLink = ({ href, children }) => (
	<button
		type="button"
		onClick={
			useFunction(() => {
				Router.push(href);
			})
		}
	>
		{children}
	</button>
);

export default ButtonLink;