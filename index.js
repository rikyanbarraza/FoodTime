const express = require('express')
const server = express()
const port = 3000
const fs = require('fs')

server.use(express.json())


let meals = [ 
      {
      idMeal: "52820",
      strMeal: "Katsu Chicken curry"
      }
  ]
  server.post('/api/meals/add', (req,res) => {
    meals.push(req.body)
    res.json(meals)
})
  
server.get('/api/meals', (req,res) => {
  
    res.json(meals[0].strMeal)
})

server.use(express.static('public'))
  
server.listen(port, () => { 
  console.log("The stove is running real hot!")
})