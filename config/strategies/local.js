var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').Model('User');

module.exports = function(){
	passport.use(new LocalStrategy(function(username, password, done){
		User.findOne({
			username: username
		}, function(err, usern){
			if (err){
				return done(err);
			}
			if(!user){
				return done(null, false,{
					message: 'Unknown User'
				});
			}
			if(!user.authenticate(password)){
				return done(null, false,{
					message: 'Invalid password'
				});
			}
			return done(null, user);
		});
	}));

};