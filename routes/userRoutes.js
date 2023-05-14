const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require('../models/userModel');

const userRouter = express.Router()

userRouter.get("/",async(req,res)=>{
    res.send("Welcome")
})

userRouter.post("/register",async(req,res)=>{
    const {username,email,password,age,city} = req.body
    try {
        const emailCheck = await userModel.findOne({email})
        if(emailCheck){
            res.status(400).send({"msg": "Email already exists"})
        }else{
                bcrypt.hash(password, 5, async(err,hash)=>{
                    const newUser = new userModel({
                        username,
                        email,
                        password:hash,  
                        age,
                        city
                    })
                    await newUser.save()
                    res.status(200).send({"msg": "User registered successfully"})
                })           
        }
    } catch (error) {
        res.status(400).send({"msg": error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})   
        if(user){
            bcrypt.compare(password, user.password, (err,result)=>{
                if(result){
                    const token = jwt.sign({userId: user._id},'masai')
                    res.status(200).send({"msg": "Login successful", token : token})
                }else{
                    res.status(400).send({"err": "Wrong credentials"})
                }
            })
        }else{
            res.status(400).send({"err": "No user exists"})
        }     
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})


module.exports = {userRouter}