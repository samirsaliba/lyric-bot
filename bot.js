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
    var ret = aux[random].substr(2, aux[random].length)
    console.log("# of tweet candidates ")
    console.log(aux.length)
   	console.log("chosen tweet # ")
    console.log(random)
    console.log(ret)
    return ret;
}

function pickRandomFile(){
	/*
	The approach below forces the probability of each tweet candidate
	to be the same, considering the lyrics (tweet candidates) 
	count for each album at the time;
	If any more lyrics are added to one or more of the files,
	then the if conditions must be updated
	*/

	//var i=0;
	//var tcdo=0, lr=0, grad=0, eights=0, mbdtf=0, yeezus=0, tlop=0, ye=0, ksg=0; 
	//while(i<100000){

		random =  getRndInteger(0, 343);
		if(random<24){
			file = "lyrics/tcdo.txt";
			//tcdo++;
		}

		else if(random<52){
			file = "lyrics/lr.txt";
			//lr++;
		}

		else if(random<88){
			file = "lyrics/grad.txt";
			//grad++;
		}

		else if(random<132){
			file = "lyrics/808s.txt";
			//eights++;
		}

		else if(random<170){
			file = "lyrics/mbdtf.txt";
			//mbdtf++;
		}

		else if(random<229){
			file = "lyrics/yeezus.txt";
			//yeezus++;
		}

		else if(random<281){
			file = "lyrics/tlop.txt";
			//tlop++;
		}

		else if(random<324){
			file = "lyrics/ye.txt";
			//ye++;
		}

		else if(random<343){
			file = "lyrics/ksg.txt";
			//ksg++;
		}

		//i++;
	//}

	/*
	console.log("tcdo = " +tcdo);
	console.log("lr = " +lr);
	console.log("grad = " +grad);
	console.log("eights = " +eights);
	console.log("mbdtf = " +mbdtf);
	console.log("yeezus = " +yeezus);
	console.log("tlop = " +tlop);
	console.log("ye = " +ye);
	console.log("ksg = " +ksg);
	*/
	/*
	//The approach below selects one album randomly,
	//each album having the same probability of being selected;
	//but since albuns differ in tweet candidates number,
	//the probability of being selected is not the same for
	//all the tweet candidates

	random =  getRndInteger(0, 9);
	switch (random) {
  	case 0:
    	file = "lyrics/tcdo.txt";
    break;

  	case 1:
    	file = "lyrics/lr.txt";
    break;

  	case 2:
     	file = "lyrics/grad.txt";
   	break;

  	case 3:
    	file = "lyrics/808s.txt";
    break;

  	case 4:
    	file = "lyrics/mbdtf.txt";
    break;

  	case 5:
    	file = "lyrics/yeezus.txt";
    break;

  	case 6:
    	file = "lyrics/tlop.txt";
    break;

   	case 7:
   		file = "lyrics/ye.txt";
   	break;

   	case 8:
   		file = "lyrics/ksg.txt";	
   	break;
}
	*/

	return file;

}

function tweet() {

	file = pickRandomFile();
	console.log(file)
	
    fs.readFile(file, 'utf8', function(error, lyrics) {  
        if (error) {
            console.log(error.message);
        } else {

            bar = pickRandomBar(lyrics);
            let tweet = bar;
            console.log(tweet)
            
            Bot.post('statuses/update', {status: tweet}, function(error, tweet, response) {
                if (error) {
                    console.log("Error making post. ", error.message);
                };
            });
        }
    });
}

tweet();