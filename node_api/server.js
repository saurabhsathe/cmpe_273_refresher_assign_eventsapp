var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors')

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
      "Origin", 
      "X-Requested-With", 
      "Content-Type",
      "http",
      "data",
      "chrome",
      "chrome-extension", 
      "chrome-untrusted", 
      "https",
      "Accept",
      "Access-Control-Allow-Origin"

    ],
  };
  
  app.use(cors(corsOpts));

// Endpoint to Get a list of users
app.get('/getEvents', function(req, res){
    fs.readFile(__dirname + "/" + "events.json", 'utf8', function(err, data){
        
        res.end(data); // you can also use res.send()
    });
})

app.get('/addEvent', (req, res) => {
    //const event_details = req.body.event_details
    //const event_name=req.body.event_name
    //console.log(event_name)
    //console.log(event_details)
    //res.sendStatus(200)
    res.send(`ok found it broooo`)
  })


// Create a server to listen at port 8080
var server = app.listen(5555, function(){
    var host = server.address().address
    var port = server.address().port
    console.log(`started server at ${host}:${port}`)
})
