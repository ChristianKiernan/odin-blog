const { PrismaClient } = require('@prisma/client');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET,
};

passport.use(
	new JwtStrategy(options, async (payload, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: payload.id },
			});
			if (!user) return done(null, false);
			return done(null, user);
		} catch (err) {
			return done(err, false);
		}
	})
);

module.exports = passport;
