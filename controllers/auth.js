const prisma = require('../config/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await prisma.user.findUnique({ where: { username } });

		if (!user) {
			return res
				.status(401)
				.json({ error: 'Invalid username or password' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ error: 'Invalid username or password' });
		}

		// Create JWT payload
		const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
			expiresIn: '30m',
		});
		res.json({ token });
	} catch (err) {
		console.error('Login error:', err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
