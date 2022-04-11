import './styles.scss';
import App from 'next/app'; // @server-only
import Head from 'next/head';
import React from 'react';
import UserContext, { useUserInApp } from 'lib/UserContext';
import getUserFromCookies from 'lib/getUserFromCookies'; // @server-only

const MyApp = ({
	Component,
	pageProps
}) => {
	const user = useUserInApp(pageProps.initialProps?.user);

	return (
		<UserContext.Provider value={user}>
			<Head>
				<title>Blue Bison Ticketing System</title>
			</Head>
			<Component {...pageProps} />
			<footer>
				<img src="/images/BisonMan.png" alt="A very cool looking Bison" />
			</footer>
		</UserContext.Provider>
	);
};

// @server-only {
MyApp.getInitialProps = async appContext => {
	const appProps = await App.getInitialProps(appContext);

	// This exposes `initialProps` to `MyApp` (on the server and the client) and to every page's props (on the client).
	appProps.pageProps.initialProps = {};

	// `req` and `res` below are exposed to every page's `getServerSideProps` (on the server) and `pages/_document` (on the server).
	const { req, res } = appContext.ctx;

	req.initialProps = appProps.pageProps.initialProps;

	const user = await getUserFromCookies(req, res);
	if (user) {
		req.user = user;

		appProps.pageProps.initialProps.user = user;
	}

	return appProps;
};
// @server-only }

export default MyApp;