import express from "express"
import createError from "http-errors"
import user from "../models/user.js"
import schema from "../helpers/schemaValidation.js"
const route=express.Router()

route.post("/register",async (req,res,next)=>{
    // console.log(req.body)
    try{
        // if(!req.body.name||!req.body.email||!req.body.phone){
        //     throw createError.BadRequest("Please fill the details")
        // }
        const validate=await schema.authSchema.validateAsync(req.body)        
        const doesExist=await user.findOne({email:validate.email})
        console.log(doesExist)
        if(doesExist){
            throw createError.Conflict(`${validate.email} user already exist`)
        }
        const newUser= new user(validate)       
        const saved=await newUser.save() 
        res.send(saved)
    }
    catch(err){
        if(err.isJoi==true)
            err.status=422
        next(err)
    }
})

route.post("/login",(req,res)=>{
    res.send("login")
})

route.post("/logout",(req,res)=>{
    res.send("logout")
})

export default route