const sqlString = sql => `'${sql.replace(/'/g, '\'\'')}'`;

export default sqlString;