import mysql from 'mysql2/promise';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'bluebison'
});

export default db;