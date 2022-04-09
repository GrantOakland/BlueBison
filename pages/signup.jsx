import ButtonLink from 'components/ButtonLink';

const Component = () => (
	<>
		{/* Will need to add the action to submit this user data to the user table in the DB */}
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account. All fields are required except time zone.</p>
		<hr />

		<label htmlFor="fname"><b>First Name:</b></label>
		<input type="text" placeholder="Enter First Name" name="fname" required />
		<br />
		<label htmlFor="lname"><b>Last Name:</b></label>
		<input type="text" placeholder="Enter Last Name" name="lname" required />
		<br />
		<label htmlFor="email"><b>Email:</b></label>
		<input type="text" placeholder="Enter Email" name="email" required />
		<br />
		<label htmlFor="phoneNumber"><b>Phone Number:</b></label>
		<input type="text" placeholder="Enter your phone number" name="phoneNumber" required />
		<br />
		<label htmlFor="psw"><b>Password:</b></label>
		<input type="password" placeholder="Enter Password" name="psw" required />
		<br />
		<label htmlFor="timeZone"><b>Time Zone:</b></label>
		<input type="text" placeholder="Enter in your Time Zone Abbreviation" name="timeZone" />
		<br />
		<br />

		<div>
			<button type="submit" className="signupbtn">Sign Up</button>
		</div>
		<br />

		<ButtonLink href="/login">Go back to login page.</ButtonLink>
		<ButtonLink href="/">Go back to homepage.</ButtonLink>
	</>
);

export default Component;