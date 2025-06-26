const { body, validationResult } = require('express-validator');
const AppError = require('../utils/appError');

exports.validateRegister = [
	body('username')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 characters long')
		.isAlphanumeric()
		.withMessage('Username must be alphanumeric'),
	body('email')
		.trim()
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email address')
		.normalizeEmail(),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			
			// Convert express-validator errors into custom errors
			const message = errors
				.array()
				.map((err) => `${err.param}: ${err.msg}`)
				.join('; ');
			return next(new AppError(message, 400));
		}
		next();
	},
];
