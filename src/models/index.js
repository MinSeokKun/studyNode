// src/models/index.js
const sequelize = require('../config/database');
const User = require('./userModel');
const Post = require('./postModel');

// 관계 설정
User.hasMany(Post);
Post.belongsTo(User);

// 모델 동기화
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    User,
    Post,
    initializeDatabase
};