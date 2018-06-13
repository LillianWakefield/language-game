const passport = require('passport');
//const JwtStrategy - require('passport-jwt').Strategy;
//const { ExtractJwt } = require('passport-jwt');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const models = require('./models');
const User = require('./models/user');



const setupAuth = (app) => {


    app.use(cookieParser());

    app.use(session({
        secret: 'whatIsThis',
        resave: true,
        saveUninitialized: true
    }));

    passport.use(new GitHubStrategy({
        clientID: "9c6f9733180638093a3e",
        clientSecret: "dd3676a334855c0b6db74e7550f38627d112c93c",
        callbackURL: "http://chilangosproj.herokuapp.com/login"
    }, (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({where: {
            githubid: profile.id
        }}).then(result => {
            return done(null, result[0]);
        })
        .catch(done)
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login', passport.authenticate('github'));
    app.get('/logout', function(req, res, next){
        req.logout();
        res.redirect('/');
    });

    app.get('/github/auth',
        passport.authenticate('github', { failureRedirect: '/login'}),
        (req, res) => {
            res.redirect('/');
        });
};
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;