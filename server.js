const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");

const app = express();
const port = 5000;

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/blog");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(port, () => {
    console.log("Server is up on port", port);
});
