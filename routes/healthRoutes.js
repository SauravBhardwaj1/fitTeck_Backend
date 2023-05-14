const express = require('express')

const healthRouter = express.Router()

healthRouter.get("/",async(req,res)=>{
    res.send("Welcome")
})

healthRouter.post("/add",async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

healthRouter.patch("/update/:id",async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

healthRouter.delete("/delete/:id",async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})


module.exports = {healthRouter}