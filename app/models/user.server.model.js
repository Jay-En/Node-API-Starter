var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName : String,
	lastName : String,
	email : {
			type : String,
			index : true,
			match: /.+\@.+\..+/
			},
	website: {
			 type: String,
			 set: function(url) {
			 if (!url) {
					 return url;	
					 } 
					 else {
							 if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) 
							 {
								 url = 'http://' + url;
							 }
								 return url;
							 }
			 			},
			 get: function(url) {
			 if (!url) {
			 		return url;
						} else {
			if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
			 		url = 'http://' + url;
					 }
					 return url;
			 		}
			 }

			 },
	username : {
		type : String,
		trim : true,
		unique: true,
		required : true},
	password: {
			 type: String,
			 validate: [
			 function(password) {
			 return password.length >= 6;},
			 'Password should be longer'
			 ]
			},
	created: {
			 type: Date,
			 default: Date.now
	 		 },
	role: {
			 type: String,
			 enum: ['Admin', 'Owner', 'User']
			 }
});

UserSchema.virtual('fullName').get(function() {
 return this.firstName + ' ' + this.lastName;
}). set(function(fullName) {
 var splitName = fullName.split(' ');
 this.firstName = splitName[0] || '';
 this.lastName = splitName[1] || '';
});

//this method will execute before saving
UserSchema.pre('save', function(next) {
 if (this.lastName !== "Bruno") {
 next()
 } else {
 next(new Error('Pogi Mo'));
 }
});

//this method will execute after saving
UserSchema.post('save', function(next) {
 if(this.isNew) {
 console.log('A new user was created.');
 } else {
 console.log('A user updated is details.');
 }
});

UserSchema.set('toJSON', { getters: true });

UserSchema.methods.authenticate = function(password) {
 return this.password === password;
};

mongoose.model('User', UserSchema);
