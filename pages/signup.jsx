import ButtonLink from 'components/ButtonLink';
import { Field, Form, Formik } from 'formik';
import api from 'lib/api';
import useFunction from 'lib/useFunction';

const Component = () => (
	<>
		{/* Will need to add the action to submit this user data to the user table in the DB */}
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account.</p>
		<hr />

		<Formik
			initialValues={{
				email: '',
				password: '',
				fname: '',
				lname: '',
				phone: '',
				timeZone: ''
			}}
			onSubmit={
				useFunction(async values => {
					await api.post('/users', values);

					location.href = '/dashboard';
				})
			}
		>
			<Form>
				<label htmlFor="email"><b>Email*:</b></label>
				<Field type="text" placeholder="Email" name="email" id="email" required autoFocus />
				<br />
				<label htmlFor="password"><b>Password*:</b></label>
				<Field type="password" placeholder="Password" name="password" id="password" required />
				<br />
				<label htmlFor="fname"><b>First Name*:</b></label>
				<Field type="text" placeholder="First Name" name="fname" id="fname" required />
				<br />
				<label htmlFor="lname"><b>Last Name*:</b></label>
				<Field type="text" placeholder="Last Name" name="lname" id="lname" required />
				<br />
				<label htmlFor="phone"><b>Phone:</b></label>
				<Field type="phone" placeholder="Phone Number" name="phone" id="phone" />
				<br />
				<label htmlFor="time-zone"><b>Time Zone:</b></label>
				<Field type="text" placeholder="Time Zone Abbreviation" name="timeZone" id="time-zone" />
				<br />
				<br />

				<div>
					<button type="submit">Sign Up</button>
				</div>
			</Form>
		</Formik>
		<br />

		<ButtonLink href="/login">Go back to login page.</ButtonLink>
		<ButtonLink href="/">Go back to homepage.</ButtonLink>
	</>
);

export default Component;