import ButtonLink from 'components/ButtonLink';

const Component = () => (
	<>
		<form action="AccountPage.html">
			<label htmlFor="uname">
				<b>Username </b>
			</label>
			<input type="text" placeholder="Enter Username" name="uname" required />
			<br />
			<label htmlFor="psw">
				<b>Password </b>
			</label>
			<input type="password" placeholder="Enter Password" name="psw" required />
			<br />

			<button type="submit" className="Login">Login</button>
		</form>
		{/* Will need to add a check to see if this user is a valid user */}

		<ButtonLink href="/">Go Back Home</ButtonLink>

		<h3>Create an account:</h3>
		<ButtonLink href="/signup">Create your account.</ButtonLink>
	</>
);

export default Component;