const Express = require("express");
require('express-async-errors');
const app = Express();
const cors = require("cors");
require("dotenv").config();
const controller_articles = require("./controller/articles");
const scraper = require("./controller/scraping");
//const restart = require("./restart/index");
app.use(cors());
app.use(Express.json());
var articles = {message: "waiting a lot.."};// varaible for articles
(async ()=> {
    await controller_articles.getArticles().then((data) => {
        articles = data; 
    }).catch((error)=> {console.log(error)});
    setInterval(async() => {
        await controller_articles.getArticles().then((data) => {
            articles = data; 
        }).catch((error)=> {console.log(error)});
    }, 60000 * process.env.MINS);
})();
// to get the posts
app.get("/", async (req, res)=> {
    res.send(articles); 
});
// to get the text and code html in the post
app.post("/post", async (req, res)=> {
    if (req.get("url") === undefined || req.get("title") === undefined || req.get("authentication") === undefined) {
        res.send({
            message: "the url and the authentication, title are required.",
            error: true
        });
    } else {
        scraper.scrap(req, res);
    }
});

// method for restart server
//restart.restart();
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("listening the server in port is "+ PORT + " .."));
