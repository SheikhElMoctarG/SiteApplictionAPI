const cheerio = require("cheerio");
require("dotenv").config();
const request = require("request");

module.exports.scrap = async (req, res)=> {
    const authentication = req.get("authentication");
    const url = req.get("url");
    if(authentication != process.env.AUTH){
        sendResponse(res, "the error in the authentication, you can't get data because you dont have the right authentication.", true);
    } else {
        const urlIsTrue = verifyURL(url, res);
        if (urlIsTrue)
            getData(url, req.get("title"), res);
    }
};
// function to verify the url
function verifyURL(url, res) {
    if(!url.startsWith(process.env.URL_GENERATION)){
        sendResponse(res, "the url isnt from the site", true);
        return false;
    } else {
        return true;
    }
}
// function reply
function sendResponse(res, message, isError) {
    res.send({
        message: message,
        error: isError
    });
}
// get the html
async function getData(url, title, res){
    try {
        request(url, function(error, response, body){
            const $ = cheerio.load(body);
            const htmlPage = $("div."+ process.env.POST_BODY).html();
            res.send({
                title: title, 
                html: htmlPage,
                link: url
            });
        });
    } catch (error) {
        console.log(error);
    }
}