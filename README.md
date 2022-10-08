## What is this Project?
it is project for get the rss from website and scraping the image and descrption from the site.
## Get Started
First step you need clone the project on Your computer with: 
```
git clone https://github.com/SheikhElMoctarG/SiteApplictionAPI.git
```
then that you to install all libraries through: 
```
npm install
```
## File is Important
to use the project you need file and some the informations: 
file is ``.env``, this file saving the private data and this file not share it with the public because it has important data:
Syntex of `.env` file: 
```
URL_GENERATION = "https://www.example.com" # here we add the domain of our website
SERVER_URL = "https://server.example.com/" # here we add the url of the server after deployed the server on the Internet. 
URL_FEED_RSS = "https://www.example.com/rss.xml" # add url of rss at your website.
CONTENT_HTML = "post-body p" # tag's post (content of the post) -> the text of the post.
IMAGE_TAG = "img" # tag of image in the post's content
POST_BODY = "post-body" #  tag's post (content of the post) -> all content as HTML.
MINS = 5; # the time after the refresh data.
AUTH = "xxxxxxxxxxxxxxxxxxxxxx" # the password for the server, you need it for verfy the requests.
```
to run code on your computer, write this command:
```
node server.js
```
IMPORTANT NOTE: `you may have a problem if your internet is weak`.
