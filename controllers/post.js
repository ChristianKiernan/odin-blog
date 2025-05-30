const prisma = require('../config/prisma');

exports.getPosts = async (req, res) => {
  try {
    // Only return published posts
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' }, 
      include: {
        author: {
          select: { username: true }, 
        },
      },
    });

    // If no posts exist
    if (posts.length === 0) {
      return res.status(200).json({ message: 'No published posts available.' });
    }

    // Return the list of posts
    return res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    return res.status(500).json({ error: 'Internal server error' });
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
