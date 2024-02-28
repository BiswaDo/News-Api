const PORT = process.env.PORT || 3000;

const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
// const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser.urlencoded({extended:true}));

// app.get("/", function(req,res){
//     res.sendFile(__dirname + "/index.html");
// });


const forbiddenWords = ['window.','Search:','https:','home', 'about', 'contact', 'pm modi','[pm modi news]','pm modi news','Latest from pm modi','error','Error'];

app.get("/news", function(req,res){
    const articles = [];

    var topic = Infosys;
    console.log(topic);

    axios.get("https://www.hindustantimes.com/topic/"+ topic + "/news")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
        

            $(".articleClick", html).each(function () {
                const title = $(this).text().replaceAll("\n", "").replaceAll("    "," ");
                const url = $(this).attr('href');

                // Check for title length and forbidden words before pushing to articles
                if (title.length <= 500 && !forbiddenWords.some(word => title.includes(word))) {
                    articles.push({
                        title,
                        url
                    });
                }
            });
            res.json(articles);
        })
        .catch((err) => console.log(err));
    });


// app.get('/', function(req,res){
//     res.json(articles);
// });

app.listen(PORT, function(req,res){
    console.log(`Server is running on port: ${PORT}`);
});
