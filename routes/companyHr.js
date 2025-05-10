const express = require("express")

const router = express.Router()

const CompanyHr = require("../models/CompanyHr")

// get all companyHr ( list of HR )
router.get("/" , async(req,res)=>{
    const companyHrs = await CompanyHr.find()
    res.send(companyHrs)
});

// get companyHr by id 
router.get("/:id" , async(req,res)=>{
    const companyHr = await CompanyHr.findOne({companyHrId:req.params.id})
    if(!companyHr) return res.status(400).send("Company HR not found")

        res.send(companyHr)

});

// add new companyHr 
router.post("/" , async(req,res)=>{
    try {
        const companyHr = new CompanyHr(req.body)
        await companyHr.save()

        res.status(201).send(companyHr)
    }
    catch (error) {

        res.status(400).send(error)
    }
});

// update companyHr information
router.put("/:id" , async(req,res)=>{
    const companyHr = await CompanyHr.findOneAndUpdate({companyHrId:req.params.id} , req.body)
    if(!companyHr) return res.status(400).send("Company HR not found")

        res.send(companyHr)
});


// delete companyHr
router.delete("/:id" , async(req,res)=>{
    const result = await CompanyHr.deleteOne({companyHrId:req.params.id})
    if(result.deletedCount === 0) return res.status(404).send("Company HR not found")

        res.send({message: "Company HR has ben deleted"})
});


module.exports = router;