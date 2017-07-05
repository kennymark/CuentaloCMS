var authorController = {};
var bcrypt = require('bcrypt');
var Author = require('./../models/author');
var session = require('express-session');
var print = console.log.bind(console)

authorController.register = function (req, res) {
    var data = {
        name: req.body.name,
        email: req.body.email,
        twitter: req.body.twitter,
        password: req.body.password
    }
    var author = new Author(data);
    bcrypt.hash(author.password, 11, function (err, hash) {
        // Store hash in database
        author.password = hash;
        author.save(function (err, person) {
            if (err) {
                console.log(`Couldn't save to database`)
            } else {
                console.log(`New user saved sucessfully ${person}`);
                res.redirect('/login')
            }
        });
    });


}

authorController.login = function (req, res) {

    var data = {
        twitter: req.body.twitter,
        password: req.body.password
    }
    let hash = bcrypt.hashSync(data.password, 11);

    Author.find({twitter:data.twitter, password: hash}, function(err, person) {
        if(err) throw err;
        if(!person){
            res.render('login', {err:'There is no such person'})
            console.log('There is no such person')
        }

        else{
            res.redirect('/')
           print('hello' + person)
        
        }
    })
   /* if (bcrypt.compareSync(data.password, hash)) {
        Author.find({
            twitter: data.twitter,
            password: hash
        }, function (err, data) {
            if (err) {
                res.redirect('/')
                throw err
            }
            // res.session.name = data.username;
            else {
                res.redirect('/recents')

            }
        })
    }
     else {
        res.redirect('/login')
    }*/


    // res === true 




}
module.exports = authorController;