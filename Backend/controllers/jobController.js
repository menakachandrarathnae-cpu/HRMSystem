const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'firstName lastName');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  const job = new Job({ ...req.body, postedBy: req.user.id });
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.applicants.push(req.body);
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateApplicantStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const applicant = job.applicants.id(req.params.applicantId);
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });

    applicant.status = req.body.status;
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getJobs, createJob, applyForJob, updateApplicantStatus };