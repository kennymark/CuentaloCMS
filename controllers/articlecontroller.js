var articleController = {};
var slug = require('slug');
var Article = require('./../models/article');

articleController.all = function (req, res) {
    Article.find({}, function (err, arts) {
        res.render('index', {
            title: 'Bloggers',
            articles: arts,
            length: arts.length
        })
    })

}
articleController.search = function (req, res) {
    var query = req.query.q;

    Article.find({
            $text: {
                $search: query
            }
        },
        function (err, results) {
            if (err) {
                throw err;
            } else {
                res.render('index', {
                    title: 'Results for ' + query,
                    articles: results
                })
            }

        });

    console.log(req.query.q)
}

articleController.recents = function (req, res) {
    Article.find({}, function (err, arts) {
        res.render('index', {
            title: 'Bloggers',
            articles: arts
        })
    }).sort({
        created_at: -1
    })
}


articleController.article = function (req, res) {
    var title = req.params.title;
    req.url = slug(title)
    Article.findOne({
        title: title
    }, function (err, arts) {
        res.render('article', {
            title: arts.title,
            article: arts

        })
        console.log(arts.title)
    })


}

module.exports = articleController;