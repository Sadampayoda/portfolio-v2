import express from 'express';
import AboutController from '../controllers/about.controller.js';
import MomentController from '../controllers/moment.controller.js';
import AuthController from '../controllers/auth.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import ProjectController from '../controllers/project.controller.js';
import openaiController from '../controllers/openai.controller.js';
import geminiAiController from '../controllers/geminiai.controller.js';

const router = express.Router();

router.get('/abouts', AboutController.getAbout);
router.get('/abouts/:id', AboutController.getById);
router.post('/abouts', AuthMiddleware, AboutController.createAbout);
router.patch('/abouts/:id', AuthMiddleware, AboutController.updateAbout);
router.delete('/abouts/:id', AuthMiddleware, AboutController.deleteAbout);


router.get('/moments', MomentController.getMoment);
router.get('/moments/:id', MomentController.getById);
router.post('/moments', AuthMiddleware, MomentController.createMoment);
router.patch('/moments/:id', AuthMiddleware, MomentController.updateMoment);
router.delete('/moments/:id', AuthMiddleware, MomentController.deleteMoment);

router.get('/projects', ProjectController.getProject);
router.get('/projects/:id', ProjectController.getById);
router.post('/projects', AuthMiddleware, ProjectController.createProject);
router.patch('/projects/:id', AuthMiddleware, ProjectController.updateProject);
router.delete('/projects/:id', AuthMiddleware, ProjectController.deleteProject);

router.post('/openai/response', openaiController.createResponse);
router.post('/geminiai/response', geminiAiController.createResponse);


router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);


export default router;
