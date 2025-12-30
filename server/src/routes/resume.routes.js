import express from 'express';
import { uploadResume, getResume, getAllResumes, deleteResume, upload } from '../controllers/resume.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/upload', upload.single('pdf'), uploadResume);
router.get('/', getAllResumes);
router.get('/:id', getResume);
router.delete('/:id', deleteResume);

export default router;

