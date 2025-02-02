// src/controllers/userController.js
const User = require('../models/userModel');

const userController = {
    // 모든 사용자 조회
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            // API 요청인 경우 JSON 응답
            if (req.headers.accept === 'application/json') {
                return res.json(users);
            }
            // 웹 브라우저 요청인 경우 HTML 페이지 렌더링
            res.render('users', { users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // 특정 사용자 조회
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // 새 사용자 생성
    createUser: async (req, res) => {
        try {
            const { name, email } = req.body;
            const user = await User.create({ name, email });
            res.status(201).json(user);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
            }
            res.status(500).json({ message: error.message });
        }
    },

    // 사용자 정보 수정
    updateUser: async (req, res) => {
        try {
            const { name, email } = req.body;
            const user = await User.findByPk(req.params.id);
            
            if (!user) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            await user.update({ name, email });
            res.json(user);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
            }
            res.status(500).json({ message: error.message });
        }
    },

    // 사용자 삭제
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            
            if (!user) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            await user.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;