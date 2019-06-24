# lyric-bot
Twitter bot that tweets lyrics from a text file.
Since I'm a big Kanye West fan, this one specifically posts Kanye West's songs lyrics.

I split the lyrics from each album into a text file (not all lyrics, just the ones I personally picked that would be a good tweet, ofc imo);
Each lyric from the text files should end with '/', then jump a line before writing the next lyric;

Then, the bot randomly selects one of the text files (i.e. one album);
When deciding from which text file to read it takes into account how many lyrics each text file has, so all the lyrics have equal chances of being chosen (it is further explained in the bot.js file);

Finally, the bot selects one of the lyrics from the text file chosen and tweets it.


PS. 
If any lyrics are added or removed, the code (bot.js) should be updated so the probabilities are preserved;
If not, the bot will continue to function normally but some lyrics will be a bit more likely to be tweeted than others;

I followed this incredible yet simple tutorial made by the great @ShawnToubeau (thanks, Shawn!):
https://www.freecodecamp.org/news/building-a-twitter-lyric-bot-12468255a4ee/

And also did some reading on managing the environment variables here (your bot won't work if you don't set the environment variables correctly):
https://devcenter.heroku.com/articles/config-vars
