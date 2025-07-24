import express from 'express';
import Post from '../models/Post.js';
import { authMiddleware } from '../utils/auth.js'

const router = new express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id });

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(400).json()
    }
})

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            author: req.user._id
        })
        res.json(newPost);
    } catch (error) {
        console.error(error);
        res.status(400).json()
    }
})

export default router;