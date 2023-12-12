const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config.json");
const { tokenTypes } = require("./tokens");
const User = require("../app/models/user");

// Configure JWT options
const jwtOptions = {
  secretOrKey: config.jwt.secret_key,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT verification function
const jwtVerify = async (payload, done) => {
  try {
    // Validate token type
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }

    // Find user associated with the JWT 
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }

    // Successful verification
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Passport JWT Strategy
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
