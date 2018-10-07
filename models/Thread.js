
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ThreadSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    authors: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String,
        required: true
    },
    // latest: {
        // type: String,
        // required: true
    // },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Thread = mongoose.model("Thread", ThreadSchema);

module.exports = Thread;

