import './styles.scss';
import Head from 'next/head';
import React from 'react';

const MyApp = ({
	Component,
	pageProps
}) => (
	<>
		<Head>
			<title>Blue Bison Ticketing System</title>
		</Head>
		<Component {...pageProps} />
		<footer>
			<img src="/images/BisonMan.png" alt="A very cool looking Bison" />
		</footer>
	</>
);

export default MyApp;