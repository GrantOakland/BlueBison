import { dbQuery } from './db';

const newID = async table => (
	(await dbQuery(`
		SELECT MAX(${table}_ID) + 1 AS VALUE
		FROM ${table}
	`))[0].VALUE
);

export default newID;