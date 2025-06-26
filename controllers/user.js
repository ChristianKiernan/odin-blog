const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

exports.register = async (req, res, next) => {
	const { username, password, email } = req.body;

	try {
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ username }, { email }],
			},
		});

		if (existingUser) {
			return next(new AppError('Username or email already in use.', 409));
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
				email,
			},
		});

		res.status(201).json({
			message: 'User registered successfully.',
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		next(err);
	}
};

exports.getDraftsByUser = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const drafts = await prisma.post.findMany({
			where: { authorId: userId, isPublished: false },
			include: { author: { select: { id: false, username: true } } },
			orderBy: { createdAt: 'desc' },
		});
		res.status(200).json({ posts: drafts });
	} catch (err) {
		next(err);
	}
};
