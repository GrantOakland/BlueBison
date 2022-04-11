export const sqlString = value => `'${typeof value === 'string' ? value.replace(/'/g, '\'\'') : ''}'`;

export const sqlNumber = value => +value || 0;

const twoDigits = value => `0${value}`.slice(-2);

export const sqlDatetime = value => {
	const date = new Date(value);

	return `'${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())} ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}'`;
};