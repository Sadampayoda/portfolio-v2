import express from 'express';
import AboutController from '../controllers/about.controller.js';
import MomentController from '../controllers/moment.controller.js';
import AuthController from '../controllers/auth.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

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


router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

export default router;
