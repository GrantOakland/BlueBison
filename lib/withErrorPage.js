import Error from 'next/error';

/** Wraps a page's component to serve an error page instead of the page component when a `statusCode` prop is passed to the page. */
export const withErrorPage = Component => (
	({ statusCode, ...props }) => (
		statusCode === undefined
			? <Component {...props} />
			: <Error statusCode={statusCode} {...props} />
	)
);

export default withErrorPage;