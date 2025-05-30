const { PrismaClient } = require('@prisma/client');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const prisma = new PrismaClient();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.ACCESS_TOKEN,
};

passport.use(
	new JwtStrategy(options, async (payload, done) => {
		const user = await prisma.user.findUnique({
			where: { id: payload.id },
		});
		if (!user) return done(null, false);
		return done(null, user);
	})
);

module.exports = passport;
