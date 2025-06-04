const prisma = require('../config/prisma');
const AppError = require('../utils/appError');

exports.getComments = async (req, res, next) => {
	try {
		const postId = Number(req.params.postId);

		if (isNaN(postId)) {
			return next(new AppError('Invalid Post ID.', 400));
		}

		const comments = await prisma.comment.findMany({
			where: { postId: postId },
		});

		if (!comments.length) {
			return next(new AppError('No comments available.', 200));
		}

		res.status(200).json({ data: { comments } });
	} catch (err) {
		next(err);
	}
};

exports.createComment = async (req, res, next) => {
	try {
		const postId = Number(req.params.postId);

		if (isNaN(postId)) {
			return next(new AppError('Invalid Post ID.', 400));
		}

		const { content } = req.body;

		if (!content) {
			return next(new AppError('Content is required', 400));
		}

		const comment = await prisma.comment.create({
			data: {
				content: content,
				authorId: req.user.id,
				postId: postId,
			},
		});

		res.status(200).json({ data: { comment } });
	} catch (err) {
		next(err);
	}
};

exports.editById = async (req, res, next) => {
	try {
		const id = Number(req.params.commentId);

		if (isNaN(id)) {
			return next(new AppError(`Invalid comment ID ${commentId}.`, 400));
		}

		const { content } = req.body;

		const existingComment = await prisma.comment.findUnique({
			where: { id: id },
		});

		if (!existingComment) {
			return next(new AppError('Comment not found.', 404));
		}

		if (existingComment.authorId !== req.user.id) {
			return next(
				new AppError('Unauthorized to update this comment.', 403)
			);
		}

		const updatedComment = await prisma.comment.update({
			where: { id: id },
			data: { content },
		});

		res.status(200).json({ data: { updatedComment } });
	} catch (err) {
		next(err);
	}
};

exports.deleteById = async (req, res, next) => {
	try {
		const id = Number(req.params.commentId);

		if (isNaN(id)) {
			return next(new AppError('Invalid comment Id.', 400));
		}

		const existingComment = await prisma.comment.findUnique({
			where: { id: id },
		});

		if (!existingComment) {
			return next(new AppError('Comment not found.', 404));
		}

		if (existingComment.authorId !== req.user.id && !req.user.isAdmin) {
			return next(
				new AppError('Unauthorized to delete this comment.', 403)
			);
		}

		await prisma.comment.delete({ where: { id: id } });

		res.status(204).send();
	} catch (err) {
		next(err);
	}
};
