var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    Blog       = require('./models/blog.model');

//APP configurations
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine','ejs');

//Temporary create DB
// Blog.create({
//     title: "Test blog",
//     image: "https://images.unsplash.com/photo-1500021804447-2ca2eaaaabeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//     body: "Hello this is the new blog!"
// });

//RESTful ROUTES
app.get('/',function(req, res){
    res.redirect('/blogs');
});

app.get('/blogs',function(req, res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log('ERROR!!!');
        }else {
            res.render('index', {blogs: blogs});
        }
    })
})

app.listen(3000, function(){
    console.log('server is running at port 3000');
})