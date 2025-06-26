const { body, validationResult } = require('express-validator');
const AppError = require('../utils/appError');

exports.validateLogin = [
	body('username').notEmpty().withMessage('Username is required'),
	body('password').notEmpty().withMessage('Password is required'),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			
            //Convert express-validator errors to custom errors
			const message = errors
				.array()
				.map((err) => `${err.param}: ${err.msg}`)
				.join('; ');
			return next(new AppError(message, 400));
		}
		next();
	},
];
