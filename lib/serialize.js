const serialize = object => {
	if (Array.isArray(object)) {
		for (let i = 0; i < object.length; i++) {
			object[i] = serialize(object[i]);
		}
	} else if (object instanceof Object) {
		if (object instanceof Date) {
			object = +object;
		} else {
			for (const key of Object.keys(object)) {
				object[key] = serialize(object[key]);
			}
		}
	}

	return object;
};

export default serialize;