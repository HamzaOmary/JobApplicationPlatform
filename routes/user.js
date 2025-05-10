const express = require("express")

const router = express.Router()

const User = require("../models/User")

// get all users ( list of users )
router.get("/" , async(req,res)=>{
    const users = await User.find()
    res.send(users)
});

// get user by id (spesific user)
router.get("/:id" , async(req,res)=>{
    const user = await User.findOne({userId:req.params.id})
    if(!user) return req.status(400).send("User not found")

        res.send(user)

});

// add new user (regstration)
router.post("/", async(req,res)=>{
    try {
        const user = new User(req.body)
        await user.save()

        res.status(201).send(user)
    }
    catch (error) {

        res.status(400).send(error)
    }
});

// update user information
router.put("/:id" , async(req,res)=>{
    const user = await User.findOneAndUpdate({userId:req.params.id} , req.body)
    if(!user) return res.status(400).send("User not found")

        res.send(user)
});

// delete user
router.delete("/:id" , async(req,res)=>{
    const result = await User.deleteOne({userId:req.params.id})
    if(result.deletedCount === 0) return res.status(404).send("User not found")

        res.send({message: "User has ben deleted"})
});


module.exports = router;