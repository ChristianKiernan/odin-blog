const prisma = require('../config/prisma');
const AppError = require('../utils/appError');

exports.getPosts = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany({
			where: { isPublished: true },
			orderBy: { createdAt: 'desc' },
			include: {
				author: { select: { username: true } },
			},
		});

		if (!posts.length) {
			return next(new AppError('No published posts available.', 200));
		}

		res.status(200).json(posts);
	} catch (err) {
		next(err);
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const { title, content, isPublished } = req.body;

		if (!title || !content) {
			return next(new AppError('Title and content are required.', 400));
		}

		const post = await prisma.post.create({
			data: {
				title,
				content,
				isPublished: isPublished || false,
				authorId: req.user.id,
			},
		});

		res.status(201).json(post);
	} catch (err) {
		next(err);
	}
};

exports.editById;
//TODO

exports.deleteById;
//TODO
