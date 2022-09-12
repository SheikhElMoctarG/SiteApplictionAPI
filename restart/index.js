const fetch = require('node-fetch');
require("dotenv").config();
module.exports.restart = setInterval(() => {
    fetch(process.env.SERVER_URL).then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
      .catch(err => {
        console.error(`Error occured: ${err}`)
        sendNotification(err)
      })
  }, 1500000);