
var express = require("express");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var axios = require("axios");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    db.Thread.deleteMany( { "note": { "$exists": false } } )
    .then(function () {
        axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:howard+bloom&key=AIzaSyA8DRL-hrmJktLRod7g8dbx2Y08h4SRrdU")
        .then(function (response) {
            var $ = cheerio.load(response.data);
            console.log("-- TEST --");
            $("tr[id^='Discussion_']").each(function (i, element) {
                var result = {};
                result.title = $(this).children().children().children("a.Title").text();
                db.Thread.create(result)
                    .then(function (dbThread) {
                        console.log(dbThread);
                    })
                    .catch(function (error) {
                        return res.json(error);
                    });
            });
            res.send("Complete");
        });
    });
});


// AIzaSyA8DRL-hrmJktLRod7g8dbx2Y08h4SRrdU

const getLibrary = () => {
    try {
        // return axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:david+eddings&key=AIzaSyA8DRL-hrmJktLRod7g8dbx2Y08h4SRrdU")
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:howard+bloom&key=AIzaSyA8DRL-hrmJktLRod7g8dbx2Y08h4SRrdU")
    } catch (error) {
        console.error(error)
    }
}

const countLibrary = async () => {
    getLibrary()
        .then(response => {
            if (response.data) {
                console.log("--------");
                // console.log(response.data.items);
                for (var i = 0; i < response.data.items.length; i++) {
                    for (var j = 0; j < response.data.items[i].volumeInfo.authors.length; j++) {
                console.log(response.data.items[i].volumeInfo.title);
                console.log(response.data.items[i].volumeInfo.subtitle);
                console.log(response.data.items[i].volumeInfo.authors[j]);
                console.log(response.data.items[i].volumeInfo.publishedDate);
                // console.log(response.data.volumeInfo.title);
                // console.log(response.data.volumeInfo.subtitle);
                // console.log(response.data.volumeInfo.authors[0]);
                // console.log(response.data.volumeInfo.publishedDate);
                // console.log(`Got ${Object.entries(response.data.volumeInfo).length}`);
                console.log("--------");
            }}
        }})
        .catch(error => {
            console.log(error)
        })
}

countLibrary();


// routes

app.get("/threads", function (req, res) {
    db.Thread.find({})
        .then(function (dbThread) {
            res.json(dbThread);
        })
        .catch(function (error) {
            res.json(error);
        });
});

app.get("/threads/:id", function (req, res) {
    db.Thread.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbThread) {
            res.json(dbThread);
        })
        .catch(function (error) {
            res.json(error);
        });
});

app.post("/threads/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Thread.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbThread) {
            res.json(dbThread);
        })
        .catch(function (error) {
            res.json(error);
        });
});

app.listen(PORT, function () {
    console.log("listen port " + PORT);
});

