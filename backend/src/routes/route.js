import express from 'express';
import AboutController from '../controllers/about.controller.js';

const router = express.Router();

router.get('/about', AboutController.getAbout);
router.get('/about/:id', AboutController.getById);
router.post('/about', AboutController.createAbout);
router.patch('/about/:id', AboutController.updateAbout);
router.delete('/about/:id', AboutController.deleteAbout);

export default router;
