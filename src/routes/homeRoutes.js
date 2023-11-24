import express from "express";

const router = express.Router()

router.get('/',(req,res)=>{
    res.json('Hello and welcome to Home Syncc ')
})

export default router;