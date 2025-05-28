const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashed,
        email,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.getById = async (req, res) => {
//     const user = await prisma.user.findUnique({
//         where: { id: req.params.id},
//     });
//     res.json(user);
// };