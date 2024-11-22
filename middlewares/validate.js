const validate = (schema, source) => {
	return async (req, res, next) => {
		try {
			let value;
			switch (source) {
				case 'body':
					value = req.body;
					break;
				case 'params':
					value = req.params;
					break;
				case 'query':
					value = req.query;
					break;
				default:
					return next(new Error('Invalid source specified for validation'));
			}
			
			const { error } = schema.validate(value);
			if (error) {
				return next(error);
			}

			next();
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = { validate }
