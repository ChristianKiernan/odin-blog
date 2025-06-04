const prisma = require('../config/prisma');
const AppError = require('../utils/appError');

exports.getComments = async (req, res, next) => {
	try {
        const postId = Number(req.params.postId)

        if (isNaN(postId)) {
            return next(new AppError('Invalid Post ID.', 400));
        };

		const comments = await prisma.comment.findMany({
            where: { postId: postId}
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
		//TODO
	} catch (err) {
		next(err);
	}
};

exports.editById = async (req, res, next) => {
	try {
		//TODO
	} catch (err) {
		next(err);
	}
};

exports.deleteById = async (req, res, next) => {
	try {
		//TODO
	} catch (err) {
		next(err);
	}
};
