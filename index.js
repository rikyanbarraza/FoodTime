const express = require('express');
const server = express();
const port = 3000;

server.get('/api', (req, res) => {
    res.json("Välkommen")
  })
  
server.post('/api', (req, res) => {
    console.log(req)
    cars.push(req.body)
    res.json("sparad")
  })
  
server.use(express.static('public'))
  
server.listen(port, () => console.log("Applikationen är i gång, välkommen!"))
  