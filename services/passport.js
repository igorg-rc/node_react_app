const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: keys.googleClientCallback,
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        // we already have a record with given profile ID 
        console.log('You already signed in!');
        done(null, existingUser); // where existingUser is an instance of User model
      } else {
        // we dont have a user with this ID, so we create new record
        new User({ googleId: profile.id })
          .save()
          .then((user) => done(null, user));
        console.log('New user has been created.');
      }
    });
})
);

