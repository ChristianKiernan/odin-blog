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

		res.status(200).json({ status: success, data: { posts } });
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

		res.status(201).json({ status: success, data: {post} });
	} catch (err) {
		next(err);
	}
};

exports.updatePostById = async (req, res, next) => {
	try {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return next(new AppError('Invalid post ID.', 400));
		}

		const { title, content, isPublished } = req.body;

		const existingPost = await prisma.post.findUnique({
			where: { id: id },
		});

		if (!existingPost) {
			return next(new AppError('Post not found.', 404));
		}

		if (existingPost.authorId !== req.user.id) {
			return next(new AppError('Unauthorized to update this post.', 403));
		}

		const updatedPost = await prisma.post.update({
			where: { id: parseInt(id) },
			data: { title, content, isPublished },
		});

		res.status(200).json({ status: success, });
	} catch (err) {
		next(err);
	}
};

exports.deletePostById = async (req, res, next) => {
	try {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			return next(new AppError('Invalid post ID.', 400));
		}

		const existingPost = await prisma.post.findUnique({
			where: { id: id },
		});

		if (!existingPost) {
			return next(new AppError('Post not found.', 404));
		}

		if (existingPost.authorId !== req.user.id && !req.user.isAdmin) {
			return next(new AppError('Unauthorized to delete this post.', 403));
		}

		await prisma.post.delete({ where: { id: parseInt(id) } });

		res.status(204).send();
	} catch (err) {
		next(err);
	}
};
