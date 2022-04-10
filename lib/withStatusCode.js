import Error from 'next/error';

/** Sets `res.statusCode` based on the returned `statusCode` prop. */
const withStatusCode = getServerSideProps => (
	async props => {
		const serverSideProps = await getServerSideProps(props);

		if (serverSideProps.props.statusCode) {
			props.res.statusCode = serverSideProps.props.statusCode;
		}

		const errorPageProps = await Error.getInitialProps(props);

		if (errorPageProps.statusCode >= 400) {
			Object.assign(serverSideProps.props, errorPageProps);
		}

		return serverSideProps;
	}
);

export default withStatusCode;