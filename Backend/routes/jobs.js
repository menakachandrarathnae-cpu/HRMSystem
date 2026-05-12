const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getJobs, createJob, applyForJob, updateApplicantStatus } = require('../controllers/jobController');

router.get('/', getJobs); // Public for viewing jobs
router.post('/', authMiddleware, createJob); // Admin/HR only
router.post('/:id/apply', applyForJob); // Public
router.put('/:jobId/applicant/:applicantId', authMiddleware, updateApplicantStatus); // Admin/HR only

module.exports = router;