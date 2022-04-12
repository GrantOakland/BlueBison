import mysql from 'mysql2';
import { sqlString } from './sql';

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'bluebison'
});

export const dbQuery = (sql, awaitSetup = true) => (
	new Promise(async (resolve, reject) => {
		if (awaitSetup) {
			await setup;
		}

		db.query(sql, (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	})
);

const setup = new Promise(async resolve => {
	await dbQuery(`
		CREATE TABLE IF NOT EXISTS USER (
			USER_ID INT PRIMARY KEY,
			USER_IS_TECHNICIAN BOOLEAN NOT NULL,
			USER_EMAIL VARCHAR(256) NOT NULL,
			USER_PASSWORD VARCHAR(45) NOT NULL,
			USER_FNAME VARCHAR(45) NOT NULL,
			USER_LNAME VARCHAR(45) NOT NULL
		)
	`, false);
	await dbQuery(`
		CREATE TABLE IF NOT EXISTS TECHNICIAN (
			USER_ID INT PRIMARY KEY,
			TECHNICIAN_LEVEL INT NOT NULL,
			FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID)
		)
	`, false);
	await dbQuery(`
		CREATE TABLE IF NOT EXISTS CUSTOMER (
			USER_ID INT PRIMARY KEY,
			CUSTOMER_PHONE VARCHAR(11),
			CUSTOMER_TIME_ZONE VARCHAR(5),
			FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID)
		)
	`, false);
	await dbQuery(`
		CREATE TABLE IF NOT EXISTS STATUS (
			STATUS_ID INT PRIMARY KEY,
			STATUS_NAME VARCHAR(45) NOT NULL
		)
	`, false);
	await dbQuery(`
		CREATE TABLE IF NOT EXISTS TICKET (
			TICKET_ID INT PRIMARY KEY,
			TICKET_DATE DATETIME NOT NULL,
			TICKET_TITLE VARCHAR(200) NOT NULL,
			TICKET_DESCRIPTION VARCHAR(2000) NOT NULL,
			TICKET_NOTES VARCHAR(2000),
			CUSTOMER_ID INT NOT NULL,
			TICKET_LEVEL INT NOT NULL,
			TECHNICIAN_ID INT,
			FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER(USER_ID),
			FOREIGN KEY (TECHNICIAN_ID) REFERENCES TECHNICIAN(USER_ID)
		)
	`, false);
	await dbQuery(`
		CREATE TABLE IF NOT EXISTS TICKET_STATUS (
			TICKET_STATUS_ID INT PRIMARY KEY,
			TICKET_ID INT NOT NULL,
			STATUS_ID INT NOT NULL,
			TICKET_STATUS_DATE DATETIME NOT NULL,
			FOREIGN KEY (TICKET_ID) REFERENCES TICKET(TICKET_ID),
			FOREIGN KEY (STATUS_ID) REFERENCES STATUS(STATUS_ID)
		)
	`, false);
	await dbQuery(`
		CREATE TABLE IF NOT EXISTS COMMENT (
			COMMENT_ID INT PRIMARY KEY,
			USER_ID INT NOT NULL,
			TICKET_ID INT NOT NULL,
			COMMENT_DATE DATETIME NOT NULL,
			COMMENT_CONTENT VARCHAR(2000) NOT NULL,
			FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID),
			FOREIGN KEY (TICKET_ID) REFERENCES TICKET(TICKET_ID)
		)
	`, false);

	const statusNames = ['New', 'In Progress', 'Closed', 'Awaiting Response'];
	for (let i = 0; i < statusNames.length; i++) {
		const statusName = statusNames[i];
		const statusID = i + 1;

		if (
			(await dbQuery(`
				SELECT *
				FROM STATUS
				WHERE STATUS_ID = ${statusID}
			`, false)).length === 0
		) {
			await dbQuery(`
				INSERT INTO STATUS VALUES (
					${statusID},
					${sqlString(statusName)}
				)
			`, false);
		}
	}

	resolve();
});