const express = require("express")

const router = express.Router()

const Job = require("../models/Job")
const CompanyHr = require("../models/CompanyHr")

// get all jobs ( list of jobs ) ""for admin or home page"
router.get("/" , async(req,res)=>{
    const jobs = await Job.find()
    res.send(jobs)
});


// get job by id
router.get("/jobId/:id" , async(req,res)=>{
    const job = await Job.findOne({jobId:req.params.id})
    if(!job) return res.status(400).send("job not found")

        res.send(job)

});

// get job by job titel (Search for a job)
router.get("/jobTitle/:title", async (req, res) => {
    try {
        const regex = new RegExp(req.params.title, 'i'); 
        const jobs = await Job.find({ jobTitle: { $regex: regex } });

        if (jobs.length === 0) {
            return res.status(400).send("No jobs similar to your search found.");
        }

        res.send(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// get job by job qualification (Search for a job)
router.get("/jobQualification/:qualification", async(req,res) => {
    try {
        const regex = new RegExp(req.params.qualification, 'i'); // 'i' for case-insensitive //Creates a regular expression to match any job title that contains the string, ignoring case.
        const jobs = await Job.find({ jobQualification: { $regex: regex } }); //This is a MongoDB query that matches any job title containing the keyword.

        if (jobs.length === 0) {
            return res.status(400).send("No jobs similar to your qualification found.");
        }

        res.send(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// add new job by company
router.post('/:compid/:hrid', async (req, res) => {
    try {
       // const companyId = req.body;

        // Validate if HR (userId) is linked to the provided companyId
        const hr = await CompanyHr.findOne({
            userId: req.params.hrid,
            companyId: req.params.compid
        });

        if (!hr) {
            return res.status(403).json({
                message: "You are not authorized to add a job for this company."
            });
        }

        // Create job with the verified companyId
        const job = new Job({
            ...req.body,
            companyId: hr.companyId 
        })
        await job.save();

        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// update job information by HR
router.put('/:jobid/:compid', async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            { jobId: req.params.jobid, companyId: req.params.compid },
            req.body
        )

        if (!job) {
            return res.status(403).json({ message: "Not authorized or job not found" })
        }

        res.send(job);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});


// delete job by HR
router.delete('/:jobid/:compid', async (req, res) => {
    try {
        const result = await Job.deleteOne({ jobId: req.params.jobid, companyId: req.params.compid })

        if (result.deletedCount === 0) {
            return res.status(403).json({ message: "Not authorized or job not found" })
        }

        res.send({ message: "Job has been deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


module.exports = router;