// src/controllers/postController.js
const { Post, User } = require('../models');

const postController = {
    // 게시글 목록
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                include: [{ model: User, attributes: ['username'] }],
                order: [['createdAt', 'DESC']]
            });
            res.render('posts/index', { posts });
        } catch (error) {
            res.render('posts/index', { posts: [], error: '게시글을 불러오는 중 오류가 발생했습니다.' });
        }
    },

    // 게시글 작성 페이지
    getCreatePost: (req, res) => {
        res.render('posts/create');
    },

    // 게시글 작성 처리
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body;
            await Post.create({
                title,
                content,
                UserId: req.user.id
            });
            res.redirect('/posts');
        } catch (error) {
            console.log("게시글 생성 오류", error);
            res.render('posts/create', { error: '게시글 작성 중 오류가 발생했습니다.' });
        }
    },

    // 게시글 상세 보기
    getPost: async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id, {
                include: [{ model: User, attributes: ['username'] }]
            });
            if (!post) {
                return res.redirect('/posts');
            }
            res.render('posts/show', { post });
        } catch (error) {
            res.redirect('/posts');
        }
    }
};

module.exports = postController;