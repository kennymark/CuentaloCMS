var db = require('mongoose');
var Schema = db.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author',
        required: false
    },
    article: {
        type: String,
        required: true,
    },
    imgPath: String,
    realDate: String,
    created_at: {
        type: Date,
        default: Date.now

    },
    updated_at: {
        type: Date,
        default: Date.now
    }

})


module.exports =  db.model('article', articleSchema)