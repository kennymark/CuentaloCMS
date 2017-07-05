var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    hbs = require('express-handlebars'),
    session = require('express-session'),
    validator = require('express-validator'),
    mongoose = require('mongoose'),
    fileUpload = require('express-fileupload'),
    faker = require('faker'),
    slug = require('slug');

require('dotenv').config();
var app = express(),
    port = process.env.PORT || 3000;

//controllers 
var postController = require('./controllers/postscontroller');
var authorController = require('./controllers/authorcontroller');
var articleController = require('./controllers/articlecontroller');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL)

//view engine
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
app.use('/public/', express.static('public/'));

app.use(session({
    secret: 'whateveryoulike',
    resave: 'true',
    saveUninitialized: 'true'
}));

//body-parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    },
}));
app.use(validator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            msg: msg,
        };
    }
}));

app.get('/', articleController.all);
app.get('/register', function (req, res) {
    res.render('register', {
        title: 'Register'
    })
});
app.get('/login', function (req, res) {
    res.render('login', {
        title: 'Sign In'
    })

});

app.get('/recents', articleController.recents);
app.get('/search', articleController.search)
app.get('/article/:title', articleController.article);
app.get('/post',  postController.get);
app.post('/post', postController.post);
app.post('/login', authorController.login);
app.post('/register', authorController.register);


app.listen(port, function () {
    console.log(`Running at http://localhost:${port}`)
})
