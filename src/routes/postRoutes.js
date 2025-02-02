// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// 모든 게시글 라우트에 인증 미들웨어 적용
router.use(authMiddleware);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 조회
 *     description: 게시글 목록을 가져옵니다.
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *   post:
 *     summary: 새 게시글 생성
 *     description: 새로운 게시글을 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 게시글 생성 성공
 */
router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);

/**
 * @swagger
 * /posts/create:
 *   get:
 *     summary: 게시글 작성 페이지
 *     description: 게시글 작성 폼을 보여줍니다.
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/create', postController.getCreatePost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: 특정 게시글 조회
 *     description: ID로 특정 게시글을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 게시글 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.get('/:id', postController.getPost);


module.exports = router;