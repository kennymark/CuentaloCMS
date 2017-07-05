var PostController = {};

PostController.get =  function (req, res) {
    res.render('post', {
        title: 'Write'
    })
}

PostController.post = function (req, res, next) {
    var image = req.files.image;
    var mimetype = image.mimetype;
    var imageTypes = 'image/png' || 'image/jpeg' || 'image/gif';

    if (mimetype !== imageTypes) {
        res.render('post', {
            err: 'File type is not supported',
            title: 'Write'
        })

    } else if (!mimetype) {
        res.redirect('/')
    } else {
        var data = {
            title: req.body.title,
            content: req.body.article
        }
        var newArticle = new Article({
            title: data.title,
            article: data.content,
            imgPath: './public/uploads/' + image.name
        })
        /*    newArticle.save(function (err, docs) {
            err ? console.log(err) : console.log(docs)
        })
            */
        image.mv('./public/uploads/' + image.name, function (err) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.redirect('/');
                console.log('File Sucessfully uploaded')
                next();
            }
        });

    }

}
module.exports = PostController;