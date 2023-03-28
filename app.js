const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/articles", (req, res) => {
    Article.find({}).then((foundArticles) => {
        res.send(foundArticles);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
});