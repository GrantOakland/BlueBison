export const sqlString = sql => `'${typeof sql === 'string' ? sql.replace(/'/g, '\'\'') : ''}'`;

export const sqlNumber = sql => typeof sql === 'string' && /^\d+$/.test(sql) ? sql : 0;