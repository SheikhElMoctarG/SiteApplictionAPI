const Parser = require("rss-parser");
const parser = new Parser();
require("dotenv").config();
const cheerio = require("cheerio");
const request = require("request");
const me = require("../controller/articles");
// function for get information of all articles
module.exports.getArticles = async()=> {
    const articles = [];
    const feed = await parser.parseURL(process.env.URL_FEED_RSS);
    await feed.items.forEach(async item => {
        await getInformation(item);
        await me.wait(10).then(async ()=> {
            articles.push({
                title: item.title, 
                description: (item["description"] != undefined)? item["description"] : "not found description.",
                image: item["image_url"],
                date: item.pubDate,
                link: item.link
            });
        });
    });
    await me.wait(15);
    return articles;
};

// function for get image and description from link the article.
async function getInformation(data) {
    try {
        request(data.link, function(error, response, body){
            const $ = cheerio.load(body);
            data["description"] = $("div."+process.env.CONTENT_HTML).text();
            data["description"] = data["description"].slice(0,100);
            data["image_url"] = $("div."+process.env.POST_BODY).find(process.env.IMAGE_TAG).eq(0).attr('src');
        });
        return await data;
    } catch (error) {
        console.log(error);
    }
}
// function to waiting 
module.exports.wait = async (s)=>{
   return new Promise((resolve) => {
        setTimeout(resolve, s * 1000);
    });
};
