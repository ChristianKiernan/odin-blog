const prisma = require('../config/prisma');
const AppError = require('../utils/appError');

exports.getComments = async (req, res, next) => {
	try {
		const postId = Number(req.params.postId);

		if (isNaN(postId)) {
			return next(new AppError('Invalid Post ID.', 400));
		}

		const comments = await prisma.comment.findMany({
			where: { postId },
			include: {
				author: {
					select: {
						id: true,
						username: true,
					},
				},
			},
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
				content,
				authorId: req.user.id,
				postId,
			},
			include: {
				author: {
					select: { id: true, username: true },
				},
			},
		});

		res.status(200).json({ data: { comment } });
	} catch (err) {
		next(err);
	}
};

exports.editById = async (req, res, next) => {
	try {
		// 1) Parse and validate the incoming commentId param
		const commentId = Number(req.params.commentId);
		if (isNaN(commentId)) {
			return next(new AppError(`Invalid comment ID ${commentId}.`, 400));
		}

		const { content } = req.body;
		if (!content) {
			return next(new AppError('Content is required.', 400));
		}

		// 2) Fetch existing comment
		const existingComment = await prisma.comment.findUnique({
			where: { id: commentId },
		});
		if (!existingComment) {
			return next(new AppError('Comment not found.', 404));
		}

		// 3) Authorization: only the author may edit
		if (existingComment.authorId !== req.user.id) {
			return next(
				new AppError('Unauthorized to update this comment.', 403)
			);
		}

		// 4) Perform update and include author info
		const updatedComment = await prisma.comment.update({
			where: { id: commentId },
			data: { content },
			include: {
				author: {
					select: { id: true, username: true },
				},
			},
		});

		// 5) Respond with the updated comment
		return res.status(200).json({ data: { updatedComment } });
	} catch (err) {
		next(err);
	}
};

exports.deleteById = async (req, res, next) => {
	try {
		// 1) Parse and validate the incoming param
		const commentId = Number(req.params.commentId);
		if (isNaN(commentId)) {
			return next(new AppError(`Invalid comment ID ${commentId}.`, 400));
		}

		// 2) Fetch the comment
		const existingComment = await prisma.comment.findUnique({
			where: { id: commentId },
		});
		if (!existingComment) {
			return next(new AppError('Comment not found.', 404));
		}

		// 3) Authorization check
		if (existingComment.authorId !== req.user.id && !req.user.isAdmin) {
			return next(
				new AppError('Unauthorized to delete this comment.', 403)
			);
		}

		// 4) Delete it
		await prisma.comment.delete({
			where: { id: commentId },
		});

		// 5) Send No Content
		return res.status(204).send();
	} catch (err) {
		return next(err);
	}
};
