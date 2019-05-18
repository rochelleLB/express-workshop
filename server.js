const fs = require("fs");
const express = require("express");
const app = express();
const formidable = require("express-formidable");

// app.get("/", (request, response) => {
//
// });



// let blogpost = request.fields

app.use(express.static("public"));
app.use(formidable());

app.post("/create-post", (request, response) => {

  fs.readFile(__dirname + "/data/posts.json", (error, file) => {
    //Takes the file being read, parses it.
    let parsedFile = JSON.parse(file);
    parsedFile[Date.now()] = request.fields.blogpost;
    fs.writeFile(__dirname + "/data/posts.json", JSON.stringify(parsedFile), (error) => {
      response.sendFile(__dirname + "/data/posts.json");
    });
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
