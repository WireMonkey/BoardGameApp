const config = require('../config.js');
const mailjet = require ('node-mailjet').connect(config.mailjetApi,config.mailjetSecret);

exports.SendEmail = async function(user) {
    try {
        console.log(user);
        await sendResetEmail(user.resetHash,user.email);
        return true;
    } catch (error) {
        throw error;
    }
}

async function sendResetEmail(resetHash, email) {
    let resetUrl = 'http://localhost:4200/reset/' + resetHash;
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "kofootapps@gmail.com",
            "Name": "Boardgame app"
          },
          "To": [
            {
              "Email": email,
            }
          ],
          "Subject": "Boardgame app password reset.",
          "TextPart": "Click here to reset your boardgame password. If the link doesn’t work, copy this URL into your browser: " + resetUrl,
          "HTMLPart": "<h3>Click <a href='" + resetUrl + "'>here</a> to reset your boardgame password.</h3><br />If the link doesn’t work, copy this URL into your browser: " + resetUrl
        }
      ]
    }).then(result => {
      console.log(result);
      return true;
    }).catch(error => {
      console.log(error);
      throw error;
    });
  }