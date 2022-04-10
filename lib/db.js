import mysql from 'mysql2';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'bluebison'
});

export default db;

export const dbQuery = sql => new Promise((resolve, reject) => {
	db.query(sql, (error, result) => {
		if (error) {
			reject(error);
		} else {
			resolve(result);
		}
	});
});