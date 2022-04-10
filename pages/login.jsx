import ButtonLink from 'components/ButtonLink';
import { Field, Form, Formik } from 'formik';
import api from 'lib/api';
import useFunction from 'lib/useFunction';
import Router from 'next/router';

const Component = () => (
	<>
		<Formik
			initialValues={{
				email: '',
				password: ''
			}}
			onSubmit={
				useFunction(values => {
					api.post('/login', values).then(() => {
						Router.push('/dashboard');
					});
				})
			}
		>
			<Form>
				<label htmlFor="email">
					<b>Email:</b>
				</label>
				<Field placeholder="Enter Email" name="email" required autoFocus />
				<br />
				<label htmlFor="password">
					<b>Password:</b>
				</label>
				<Field type="password" placeholder="Enter Password" name="password" required />
				<br />

				<button type="submit">Log In</button>
			</Form>
		</Formik>
		{/* Will need to add a check to see if this user is a valid user */}

		<br />
		<br />
		<ButtonLink href="/">Go Back Home</ButtonLink>

		<h3>Create an account:</h3>
		<ButtonLink href="/signup">Create your account.</ButtonLink>
	</>
);

export default Component;