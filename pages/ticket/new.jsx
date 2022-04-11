import ButtonLink from 'components/ButtonLink';
import { Field, Form, Formik } from 'formik';
import api from 'lib/api';
import useFunction from 'lib/useFunction';
import Router from 'next/router';

const Component = () => (
	<>
		<h2>Create a new ticket.</h2>

		{/* Need to add action to submit data into SQL DB Will need to add the action to submit this user data to the user table in the DB */}
		<p>Please fill in this form to create a new ticket.</p>
		<hr />
		<Formik
			initialValues={{
				title: '',
				description: ''
			}}
			onSubmit={
				useFunction(async values => {
					const { data: ticketID } = await api.post('/tickets', values);

					Router.push(`/ticket/${ticketID}`);
				})
			}
		>
			<Form>
				<label htmlFor="ticket-title"><b>Title of your issue:</b></label>
				<Field type="text" placeholder="Enter Ticket Title" id="ticket-title" name="title" required />
				<br />
				<label htmlFor="ticket-description"><b>Description of your issue:</b></label>
				<Field as="textarea" id="ticket-description" name="description" rows="4" cols="100" placeholder="Enter details here..." />
				<br />
				<input type="submit" value="Submit your ticket" />

				<br />
			</Form>
		</Formik>

		<br />
		<ButtonLink href="/dashboard">Go back to your dashboard.</ButtonLink>
	</>
);

export default Component;