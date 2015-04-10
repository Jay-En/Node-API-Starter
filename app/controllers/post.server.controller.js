 var Post = require('mongoose').model('Post');

 exports.create = function(req, res, next){

 	var post = new Post(req.body);

 	post.save(function(err){
 		if(err){
 			return next(err);
 		}
 		else{

 			res.json(req.body);
 		}

 	});


 };

 exports.list = function(req, res, next){
 	Post.find().populate('author').exec(function(err, posts) {
	 if (err){
 			return next(err);
 		}
 		else
 		{
 			res.json(posts);
 		}
 })	
 };

