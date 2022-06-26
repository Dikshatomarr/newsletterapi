
//*jshint esversion: 6 */
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function (req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members:    [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
        };

        const jsonData = JSON.stringify(data);
        const url = "https://us11.api.mailchimp.com/3.0/lists/9e71e439e8";
       
       const options={
        method: "POST",
        auth: "diksha1:91be808d7167adc9cc3fe285cdfc5adc-us11"
       }
       
     const request = https.request(url, options, function(response){
       if ( response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");}
        else{
            res.sendFile(__dirname  + "/failure.html");
        }
        
        response.on("data", function(data){ 
                console.log(JSON.parse(data));
        });
    })

    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
}); // listen on port

