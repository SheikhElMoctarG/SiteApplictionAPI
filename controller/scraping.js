const cheerio = require("cheerio");
require("dotenv").config();
const request = require("request");

module.exports.scrap = async (req, res)=> {
    if(req.body.auth != process.env.AUTH){
        sendResponse(res, "the error in the authentication, you can't get data because you dont have the right authentication.", true);
    } else {
        const urlIsTrue = verifyURL(req.body.url, res);
        if (urlIsTrue)
            getData(req.body.url, req.body.title, res);
    }
};
// function to verify the url
function verifyURL(url, res) {
    if(!url.startsWith(process.env.URL_GENERATION)){
        sendResponse(res, "the url isnt from the" + process.env.URL_GENERATION, true);
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
            const htmlPage = $("div."+ process.env.POST_BODY);
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