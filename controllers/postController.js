import Post from '../models/post.js'
import bcrypt from 'bcrypt'

// Creating Post
export const createPost = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).send(savedPost);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Getting Post
export const getPost = async (req, res) => {
    // console.log(req.params);
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).send(other);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Update Post
export const updatePost = async (req, res) => {
    // console.log(req.params);
    try {
        const post = await Post.findById(req.params.id);
        // console.log(post._doc);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).send("Your post has been updated")
        } else {
            return res.status(403).send("You can update only your post")
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

// Delete Post
export const deletePost = async (req, res) => {
    // console.log(req.params);
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).send("Your post has been deleted");
        } else {
            return res.status(403).send("You can delete only your post");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}

// Like/unlike Post
export const likePost = async (req, res) => {
    console.log(req.params);
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).send("User has been followed")
            } else {
                res.status(403).send("you already follow this user");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(403).send("You can't follow yourself");
    }
}

// Timeline all Post
export const timelinePost = async (req, res) => {
    console.log(req.params);
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).send("User has been unfollowed")
            } else {
                res.status(403).send("you don't follow this user");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(403).send("You can't unfollow yourself");
    }
}