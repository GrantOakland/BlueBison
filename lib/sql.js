export const sqlString = sql => `'${typeof sql === 'string' ? sql.replace(/'/g, '\'\'') : ''}'`;

export const sqlNumber = sql => +sql || 0;