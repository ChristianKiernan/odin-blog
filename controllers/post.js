const prisma = require('../config/prisma');

exports.getPosts = async (req, res) => {
	const posts = await prisma.post.findMany();

	//Handle case where there are no posts
	if (posts.length === 0) {
		res.json({
			message: 'No posts yet',
		});
	} else {
		res.json(posts);
	}
};

exports.createPost = async (req, res) => {
	try {
		const { title, content, isPublished } = req.body;

		const post = await prisma.post.create({
			data: {
				title,
				content,
				isPublished: isPublished || false,
				authorId: req.user.id,
			},
		});

		res.status(201).json(post);
	} catch (error) {
		console.error('Error creating post:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.editById;
//TODO

exports.deleteById;
//TODO
