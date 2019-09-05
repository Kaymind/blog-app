var express          = require('express'),
    methodOverride   = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    app              = express(),
    bodyParser       = require('body-parser'),
    Blog             = require('./models/blog.model');

//APP configurations
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
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
//INDEX ROUTE
app.get('/blogs',function(req, res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log('ERROR!!!');
        }else {
            res.render('index', {blogs: blogs});
        }
    })
})

//NEW ROUTE
app.get('/blogs/new',function(req, res){
    res.render('new');
})

//CREATE ROUTE
app.post('/blogs',function(req, res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err, newBlog){
        if(err){
            res.render('new');
        }else {
            console.log(req.body.blog)
            res.redirect('/blogs');
        }
    })
})

//SHOW ROUTE
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        }else {
            res.render('show',{blog: foundBlog});
        }
    })
})

//EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        }else {
            res.render('edit', {blog: foundBlog});
        }
    })
});

//UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        }else {
            res.redirect('/blogs/' + req.params.id);
        }
    })
});

//DELETE ROUTE
app.delete('/blogs/:id', function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/blogs');
        }else {
            res.redirect('/blogs');
        }
    });
})

app.listen(3000, function(){
    console.log('server is running at port 3000');
})