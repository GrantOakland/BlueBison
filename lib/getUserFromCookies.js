import Cookies from 'cookies';
import { dbQuery } from './db';

const getUserFromCookies = async (req, res) => {
	const cookies = new Cookies(req, res);
	const userID = cookies.get('user');

	if (userID) {
		const [user] = await dbQuery(`
			SELECT *
			FROM USER
			WHERE USER_ID = ${userID}
		`);

		return user;
	}
};

export default getUserFromCookies;