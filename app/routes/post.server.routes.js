var post = require('../controllers/post.server.controller');

module.exports = function(app){
	app.route('/post')
	.post(post.create)
	.get(post.list);

};