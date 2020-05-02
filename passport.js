const passport = require("passport");
const User = require("./models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
var FacebookTokenStrategy = require("passport-facebook-token");

require("dotenv").config();

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("token"),
      secretOrKey: process.env.SECRETE,
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Should have full user profile over here
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          console.log("user exsist in DB");
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
          name: profile.displayName,
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// FACEBOOK STRATEGY

passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.FacebookClientID,
      clientSecret: process.env.FacebookClientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Should have full user profile over here
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        const existingUser = await User.findOne({ "facebook.id": profile.id });

        if (existingUser) {
          console.log("user exsist in DB");
          return done(null, existingUser);
        }

        const newUser = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            email: profile.emails[0].value,
          },
          name: profile.displayName,
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
