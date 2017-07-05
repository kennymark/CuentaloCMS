var db = require('mongoose');

var Schema = db.Schema;

var authorSchema = new Schema({
    name: String,
    twitter: String,
    email: String,
    password: String,
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'article'
    }]

})

module.exports = db.model('author', authorSchema);