import express from 'express';
import AboutController from '../controllers/about.controller.js';
import MomentController from '../controllers/moment.controller.js';
import AuthController from '../controllers/auth.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import ProjectController from '../controllers/project.controller.js';
import openaiController from '../controllers/openai.controller.js';
import geminiAiController from '../controllers/geminiai.controller.js';
import chatController from '../controllers/chat.controller.js';
import messageController from '../controllers/message.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Abouts
 *   description: About management
 */

/**
 * @swagger
 * /abouts:
 *   get:
 *     summary: Get all abouts
 *     tags: [Abouts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get('/abouts', AboutController.getAbout);


/**
 * @swagger
 * /abouts/{id}:
 *   get:
 *     summary: Get about by ID
 *     tags: [Abouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the about
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: About not found
 *       500:
 *         description: Internal server error
 */
router.get('/abouts/:id', AboutController.getById);


/**
 * @swagger
 * /abouts:
 *   post:
 *     summary: Create about
 *     tags: [Abouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: About created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/abouts', AboutController.createAbout);

/**
 * @swagger
 * /abouts/{id}:
 *    patch:
 *      summary: Update about
 *      tags: [Abouts]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the about
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name: { type: string }
 *                description: { type: string }
 *      responses:
 *        200:
 *          description: About updated successfully
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: About not found
 *        500:
 *          description: Internal server error
 */
router.patch('/abouts/:id', AuthMiddleware, AboutController.updateAbout);

/**
 * @swagger
 * /abouts/{id}:
 *    delete:
 *      summary: Delete about
 *      tags: [Abouts]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the about
 *      responses:
 *        200:
 *          description: About deleted successfully
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: About not found
 *        500:
 *          description: Internal server error
 */
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
router.get('/geminiai/message', geminiAiController.getMessage);
router.delete('/geminiai/message', geminiAiController.deleteMessage);

router.get('/chats/:id', chatController.getById);


router.get('/messages', messageController.getMessage);
router.get('/messages/:id', messageController.getById);


router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);


export default router;
