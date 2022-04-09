import ButtonLink from 'components/ButtonLink';

const Component = () => (
	<>
		<h2>Create a new ticket.</h2>

		<form action="#">
			{/* Need to add action to submit data into SQL DB Will need to add the action to submit this user data to the user table in the DB */}
			<p>Please fill in this form to create a new ticket.</p>
			<hr />

			<label htmlFor="TICKET_TITLE"><b>Subject of your issue:</b></label>
			<input type="text" placeholder="Enter Ticket Title" name="TICKET_TITLE" required />
			<br />
			<label htmlFor="TICKET_DESCRIPTION"><b>Description of your issue:</b></label>
			<textarea id="TICKET_DESCRIPTION" name="TICKET_DESCRIPTION" rows="4" cols="100" placeholder="Enter details here..." />
			<br />
			<input type="submit" name="TICKET_DESCRIPTION" value="Submit your ticket" required />

			<br />
		</form>
		<br />
		<ButtonLink href="/dashboard">Go back to your dashboard.</ButtonLink>
	</>
);

export default Component;