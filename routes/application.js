const express = require("express")

const router = express.Router()

const Application = require("../models/Application")
const Job = require("../models/Job")
const User = require("../models/User")


// get all Application ( list of Application )
router.get("/" , async(req,res)=>{
    const applications = await Application.find()
    res.send(applications)
});

// get application by id 
router.get("/appId/:id" , async(req,res)=>{
    const application = await Application.findOne({appId:req.params.id})
    if(!application) return res.status(400).send("application not found")

        res.send(application)

});

// get all applications you have submitted before
router.get("/userId/:userid" , async(req,res)=>{
    const applications = await Application.find({userId:req.params.userid})
    if(!applications) return res.status(400).send("you don't have submitted an application before")

        res.send(applications)

});

// get all application submitted to the company 
router.get('/companyId/:compid', async (req, res) => {
    try {
        const jobs = await Job.find({ companyId: Number(req.params.compid) });
        const jobIds = jobs.map(job => job.jobId);  //array containing job id  to this company
        const applications = await Application.find({ jobId: { $in: jobIds } }); //MongoDB operator that checks if a value exists in an array.
        
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



// add new application (apply for a job offer)
router.post("/", async (req, res) => {
    try {
        const { userId, jobId, note } = req.body;

        const user = await User.findOne({ userId: userId });
        const job = await Job.findOne({ jobId: jobId });
        const existingApplication = await Application.findOne({
            userId: userId,
            jobId: jobId
        });


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       else if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
       else if (existingApplication) {
            return res.status(400).json({ message: "You already applied for this job" });
        }

        // Create new application
        const application = new Application({
            userId: userId,
            jobId: jobId,
            note: note
        });

        await application.save();

        res.status(201).json({application,message: "Application submitted successfully"});
    } 
    catch (error) {
        res.status(400).json({message: "Failed to submit application",error: error.message});
    }
});

// update application statuse from company how puplish job
router.put("/:appId/:compId" , async(req,res)=>{
    const application = await Application.findOne({appId:req.params.appId})
    if(!application) return res.status(400).send("Application not found")

    const job = await  Job.findOne({jobId: application.jobId})
    if(!job) return res.status(400).send("Job not found") 

        if (job.companyId.toString() === req.params.compId)
        {
            application.status = req.body.status; 
            await application.save()
            res.send(application)  
        }
        else
        {
            return res.status(403).send("You are not authorized to update this application")
        }
      
});

// delete application from user how applide to the job
router.delete("/:appId/:userId" , async(req,res)=>{
    const application = await Application.findOne({appId:req.params.appId})
    if(!application) return res.status(400).send("Application not found")

    if (application.userId.toString() === req.params.userId)
        { 
            await application.deleteOne();
            res.send({message: "Application deleted successfully"})  
        }
        else
        {
            return res.status(403).send("You are not authorized to delete this application")
        }       
});


module.exports = router;