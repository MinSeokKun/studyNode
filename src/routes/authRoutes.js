// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /register:
 *   get:
 *     summary: 회원가입 페이지
 *     description: 회원가입 폼을 보여줍니다.
 *     responses:
 *       200:
 *         description: 성공
 *   post:
 *     summary: 회원가입 처리
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 입력
 */
router.get('/register', authController.getRegister);
router.post('/register', authController.register);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: 로그인 페이지
 *     description: 로그인 폼을 보여줍니다.
 *     responses:
 *       200:
 *         description: 성공
 *   post:
 *     summary: 로그인 처리
 *     description: 사용자 인증을 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 인증 실패
 */
router.get('/login', authController.getLogin);
router.post('/login', authController.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: 로그아웃
 *     description: 사용자 로그아웃을 처리합니다.
 *     responses:
 *       302:
 *         description: 로그인 페이지로 리다이렉트
 */
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;