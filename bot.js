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
	/*
	returns a round integer between min (INCLUDED) and max (EXCLUDED)
	*/
  return Math.floor(Math.random() * (max - min) ) + min;
}

function pickRandomBar(lyrics) {
	/*
	splits "lyrics" which is the full text of the file into an array of substrings
	it splits the string every time a blank line occurs (\n\n)

	then, randomizes an integer between 0 and the number of lyrics on the file
	and uses this integer as index to the array of substrings
	*/

    var aux = lyrics.split(/\n\n/);
    const random =  getRndInteger(0, aux.length);
    console.log("#tweet candidates: " + aux.length + " #chosen: " + random);

    return aux[random];
}

function gnol(file){
	/*
	gnol as get-number-of-lyrics
	prints to console the number of lyrics the album passed as parameter has
	*/
	fs.readFile(file, 'utf8', function(error, text) {  
        if (error) {
            console.log(error.message);
        } else {
            var aux = text.split(/\n\n/);
            console.log(file + " | " + aux.length);
        }
    });
}

function getNumberOfLyrics(){
	/*
	for each album calls gnol, which in turn prints to console the number of lyrics of the album passed
	*/
	console.log("file  |  #Lyrics");

	file = "lyrics/tcdo.txt";
	gnol(file);

	file = "lyrics/lr.txt";
	gnol(file);

	file = "lyrics/grad.txt";
	gnol(file);

	file = "lyrics/808s.txt";
	gnol(file);

	file = "lyrics/mbdtf.txt";
	gnol(file);

	file = "lyrics/yeezus.txt";
	gnol(file);

	file = "lyrics/tlop.txt";
	gnol(file);

	file = "lyrics/ye.txt";
	gnol(file);

	file = "lyrics/ksg.txt";
	gnol(file);

	file = "lyrics/cruel.txt";
	gnol(file);

	file = "lyrics/wtt.txt";
	gnol(file);
}

function pickRandomFile(){
	/*
	The approach below forces the probability of each tweet candidate
	to be the same, considering the lyrics (tweet candidates) 
	count for each album at the time;

	PS. If any lyrics are added or removed, the code should be updated so the probabilities are preserved; 
		If not, the bot will continue to function normally but some lyrics will be a bit more likely to be tweeted than others;
		To get the numbers of lyrics per file, simply call getNumberOfLyrics and it'll be printed to console.

		getNumberOfLyrics(); 
	*/

	
	// if you wanna check if the probabilities are correct, uncomment all the lines starting with '//'
	// it will pick the files 100.000 times and print to console how many times each of the files was chosen.

	//var i=0;
	//var tcdo=0, lr=0, grad=0, eights=0, mbdtf=0, yeezus=0, tlop=0, ye=0, ksg=0, cruel=0, wtt=0; 
	//while(i<100000){

		random =  getRndInteger(0, 485);
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

		else if(random<376){
			file = "lyrics/cruel.txt";
			//cruel++;
		}

		else if(random<485){
			file = "lyrics/wtt.txt";
			//wtt++;
		}

		//i++;
	//}

	//console.log("tcdo = " +tcdo);
	//console.log("lr = " +lr);
	//console.log("grad = " +grad);
	//console.log("eights = " +eights);
	//console.log("mbdtf = " +mbdtf);
	//console.log("yeezus = " +yeezus);
	//console.log("tlop = " +tlop);
	//console.log("ye = " +ye);
	//console.log("ksg = " +ksg);
	//console.log("cruel = " +cruel);
	//console.log("wtt = " +wtt);
	
	/*
	//The approach below selects one album randomly,
	//each album having the same probability of being selected;
	//but since albuns differ in tweet candidates number,
	//the probability of being selected is not the same for
	//all the tweet candidates

	random =  getRndInteger(0, 11);
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

	   	case 9:
	   		file = "lyrics/cruel.txt";	
	   	break;

	   	case 10:
	   		file = "lyrics/wtt.txt";	
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
            
            // the code below actually (tries to) tweet, so if you're testing the bot 
            // make sure to comment the following lines

            Bot.post('statuses/update', {status: tweet}, function(error, tweet, response) {
                if (error) {
                	console.log("Error making post. ", error.message);
            		tweet();
                }
                else {
					console.log("Tweet sent.");
                }
            });    
        }
    });
}

tweet();
