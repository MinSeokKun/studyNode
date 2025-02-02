// src/controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    // 회원가입 페이지 렌더링
    getRegister: (req, res) => {
        res.render('auth/register');
    },

    // 로그인 페이지 렌더링
    getLogin: (req, res) => {
        res.render('auth/login');
    },

    // 회원가입 처리
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            console.log('회원가입 요청', 
                { username, email}
            );
            const user = await User.create({
                username,
                email,
                password
            });
            console.log('회원가입 성공', user);
            res.redirect('/login');
        } catch (error) {
            console.log('회원가입 실패', error);
            res.render('auth/register', { error: '회원가입 중 오류가 발생했습니다.' });
        }
    },

    // 로그인 처리
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            
            if (!user) {
                return res.render('auth/login', { error: '사용자를 찾을 수 없습니다.' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.render('auth/login', { error: '비밀번호가 일치하지 않습니다.' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');
            res.cookie('token', token);
            res.redirect('/posts');
        } catch (error) {
            res.render('auth/login', { error: '로그인 중 오류가 발생했습니다.' });
        }
    }
};

module.exports = authController;