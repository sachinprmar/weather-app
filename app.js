const express = require("express");
const https = require("https");
const boddyParser = require("body-parser");

const app = express();
app.use(boddyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

const queury =  req.body.cityName;
const appid = "dec81618d11521c160e2b9fa779118ec";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+queury+"&units=metric&appid="+appid;
https.get(url,function(response){

    response.on("data",function(data){ // To fetch data
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon;

         res.write("<h1>The Temperature in " +queury+ " is "+temp+" degree celcius</h1>");
         res.write("<h3>Weather is Currently "+weatherDescription+"</h3>");
         res.write("<img src = https://openweathermap.org/img/wn/"+icon+"@2x.png>");
         
         res.send();
    });


})
});





 
app.listen(3000,function(){
    console.log("server is started at post 3000");
});