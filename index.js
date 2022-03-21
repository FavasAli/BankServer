//importing the express in the index.js
const express=require('express')

//import jsonwebtoken
const jwt = require('jsonwebtoken')

const dataService =require('../bankServer/services/data.services')

//create an app using express
//server application name
const app=express()

//application specific middlewares
const appMiddleware=(req,res,next)=>{
console.log("Specific middlewares");
next()
}

//to verify token

const jwtMiddleware = (req,res,next) => {

  try{  
    //   const token=req.body.token // token put in body
      const token=req.headers["x-access-token"] // token put in headers

    //verify token
   const data= jwt.verify(token,'supersecretkey123')
   req.currentAcno = data.currentAcno
   next()}
   catch{
       res.status(422).json({
           status:false,
           message:"Please Login in"
       })
   }

}

app.use(appMiddleware)

//to parse json
app.use(express.json())


//resolve http requst from clint

//GET - to read the data
app.get('/',(req,res)=>{
    res.send("IT'S A GET METHOD");
})

//PUT - to update the data
app.put('/',(req,res)=>{
    res.send("IT'S A PUT METHOD");
})

//POST - to create  data
app. post('/',(req,res)=>{
    res.send("IT'S A POST METHOD");
})

//PATCH - to update partially  data
app.patch('/',(req,res)=>{
    res.send("IT'S A PATCH METHOD");
})

//DELETE - to delete data
app.delete('/',(req,res)=>{
    res.send("IT'S A DELETE METHOD");
})

//Register API
app.post('/register',(req,res)=>{
    const result=dataService.register(req.body.acno,req.body.password,req.body.uname)
    res.status(result.statuCode).json(result)
})

//Login API
app.post('/login',(req,res)=>{
    const result=dataService.login(req.body.acno,req.body.password)
    res.status(result.statuCode).json(result)
})

//Deposit API
app.post('/deposit',jwtMiddleware, (req,res)=>{
    const result=dataService.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statuCode).json(result)
})

//Withdraw API
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    const result=dataService.withdraw(req,req.body.acno,req.body.password,req.body.amt)
    res.status(result.statuCode).json(result)
})

//Transaction API
app.post('/transaction',jwtMiddleware,(req,res)=>{
    const result=dataService.getTransaction(req.body.acno)
    res.status(result.statuCode).json(result)
})

//set up the post number
app.listen(3000,() =>{
    console.log("server started at port:3000");
})
