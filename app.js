const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const dotenv = require("dotenv").config({ path: "./.env" });

const app = express();
console.log(process.env.API_KEY);
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  // console.log(firstName + "___" + lastName);
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/4389df792d";

  const options = {
    method: "POST",
    auth: `Dheeraj:${process.env.API_KEY}`,
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      // console.log(response);
      console.log(process.env.API_KEY);
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

// app.post("/success", function (req, res) {
//   res.redirect("https://github.com/D-zero-7");
// });

app.listen(process.env.PORT || 3000, function () {
  console.log("The server is live at port 3000");
});

//audience id
//4389df792d"removed the changes...""
