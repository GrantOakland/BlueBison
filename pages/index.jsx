import ButtonLink from 'components/ButtonLink';

const Component = () => (
	<>
		<h1 style={{ fontSize: '45px' }}>
			Welcome to the Blue Bison Ticketing System
		</h1>

		<h3>
			<ButtonLink href="/login">Log In</ButtonLink>
		</h3>

		<br />
		<form>
			<label htmlFor="SearchTerm">
				Search a closed ticket by subject or description:
			</label>
			<input type="text" id="SearchTerm" />
			<input type="submit" value="Submit" />
		</form>

		<table>
			<tr>
				<th>Subject</th>
				<th>Description</th>
				<th>See Resolution</th>
			</tr>
		</table>
	</>
);

export default Component;