const express = require("express")

const router = express.Router()

const Company = require("../models/Company")
const User = require("../models/User")
const CompanyHr = require("../models/CompanyHr")

// get all companys ( list of companys )
router.get("/" , async(req,res)=>{
    const companys = await Company.find()
    res.send(companys)
});

// get company by id
router.get("/companyId/:id" , async(req,res)=>{
    const company = await Company.findOne({companyId:req.params.id})
    if(!company) return res.status(400).send("company not found")

        res.send(company)

});


// get company by company name (serche for a company)
router.get("/companyName/:name", async (req, res) => {
    try {
        const regex = new RegExp(req.params.name, 'i'); // 'i' for case-insensitive
        const companies = await Company.find({ companyName: { $regex: regex } });

        if (companies.length === 0) {
            return res.status(400).send("No company similar to your search found.");
        }

        res.send(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// add new company (regstration)
router.post("/:userId", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });

        if (!user) {
            return res.status(403).json({ message: "You do not have an account." });
        }

        // Create company
        const company = new Company(req.body);
        await company.save();

        // Assign HR to company
        const companyHr = new CompanyHr({
            userId:user.userId,           //mongoose.Types.ObjectId(req.params.userId)  // HR is the current user
            companyId:company.companyId   // mongoose.Types.ObjectId(company.companyId)  // ID of the newly created company
        });
        await companyHr.save();

        res.status(201).json({ company, companyHr });  

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// update company information
router.put("/:id" , async(req,res)=>{
    const company = await Company.findOneAndUpdate({companyId:req.params.id} , req.body)
    if(!company) return res.status(400).send("company not found")

        res.send(company)
});

// delete company
router.delete("/:id" , async(req,res)=>{
    const result = await Company.deleteOne({companyId:req.params.id})
    if(result.deletedCount === 0) return res.status(404).send("company not found")

        res.send({message: "company has ben deleted"})
});


module.exports = router;