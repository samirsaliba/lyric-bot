const Twit = require('twit');
const fs = require('fs');
require('dotenv').config();

const Bot = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET  
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function pickRandomBar(lyrics) {
    var aux = lyrics.split("/");
    const random =  getRndInteger(0, aux.length);
    var ret = aux[random].substr(4, aux[random].length)
    console.log(random)
    console.log(ret)
    return ret;
}


function tweet() {
	//var random =  getRndInteger(0, 9);
	let random = 7;
	switch (random) {
  	case 0:
    	file = "tcdo.txt";
    break;

  	case 1:
    	file = "lr.txt";
    break;

  	case 2:
     	file = "grad.txt";
    break;

  	case 3:
    	file = "808s.txt";
    break;

  	case 4:
    	file = "mbdtf.txt";
    break;

  	case 5:
    	file = "yeezus.txt";
    break;

  	case 6:
    	file = "tlop.txt";
    break;

   	case 7:
   		file = "ye.txt";
   	break;

   	case 8:
   		file = "ksg.txt";	
   	break;
}

    fs.readFile(file, 'utf8', function(error, lyrics) {  
        if (error) {
            console.log(error.message);
        } else {

            // checks to see if the start of the tweet doesn't start 
            // with punctuation or special characters

            bar = pickRandomBar(lyrics);
            let tweet = bar;

            // runs until char limit is reached and tries finishing the last word it was on

            console.log(tweet)
            
            //Bot.post('statuses/update', {status: tweet}, function(error, tweet, response) {
            //    if (error) {
            //        console.log("Error making post. ", error.message);
            //    };
            //});
        }
    });
}

tweet();