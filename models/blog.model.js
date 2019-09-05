var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog_app');

var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Blog', blogSchema);