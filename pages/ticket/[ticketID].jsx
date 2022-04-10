import ButtonLink from 'components/ButtonLink';

const Component = () => (
	<>
		<div>

			<h2>Ticket Number:</h2>
			<span>%TICKETNUMBER%</span>
		</div>
		<br />
		<div style={{ float: 'right' }}>
			<h3>Title:</h3>
			<span>TitlePlaceholder</span>
			<br />
			<h3>Brief Description:</h3>
			<span>DescriptionPlaceholder</span>
			<br />
			<h3>Ticket Status:</h3>
			<span>Status Placeholder</span>
			{/* Will need to make this a dropdown */}
		</div>
		<div style={{ float: 'left' }}>

			<h3>First Name: </h3>
			<span>DescriptionPlaceholder</span>
			<br />
			<h3>Last Name: </h3>
			<span>DescriptionPlaceholder</span>
			<br />

			<h3>Phone Number: </h3>
			<span>DescriptionPlaceholder</span>
			<br />

			<h3>Email Address: </h3>
			<span>DescriptionPlaceholder</span>
			<br />

		</div>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />

		<div>
			<h3>Previous comments:</h3>
			<table>{/* Put old comments from DB in here */}</table>
		</div>
		<br />
		<br />
		<div />
		<label htmlFor="CommentContent"><b>Enter in a new note:</b></label>
		<br />
		<textarea
			id="CommentContent"
			name="CommentContent"
			rows="10"
			cols="100"
			placeholder="Enter details here..."
		/>
		<br />
		<form action="TechView.html">
			<input type="submit" name="CommentContent" value="Save &amp; Close" required />
		</form>
		<br />
		<ButtonLink href="/">Go Back Home</ButtonLink>
	</>
);

export default Component;