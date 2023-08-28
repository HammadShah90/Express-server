import User from '../models/user.js'
import bcrypt from 'bcrypt'

// Getting User
export const getProfile = async (req, res) => {
    console.log(req.params);
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).send(other);
    } catch (err) {
        res.status(500).send(err);
    }
}

// Update User
export const updateProfile = async (req, res) => {
    console.log(req.params);
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            // console.log(req.body.password);
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).send(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                ...req.body
            })
            // console.log(user);
            res.status(200).send("Account has been updated")
        } catch (error) {
            return res.status(500).send(error)
        }
    } else {
        return res.status(403).send("You can update only your profile")
    }
}

// Delete User
export const deleteProfile = async (req, res) => {
    console.log(req.params);
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            console.log(user);
            res.status(200).send("Account has been deleted")
        } catch (error) {
            return res.status(500).send(error)
        }
    } else {
        return res.status(403).send("You can delete only your profile")
    }
}

// Follow User
export const followProfile = async (req, res) => {
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
                res.status(403).send("you alraedy follow this user");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(403).send("You can't follow yourself");
    }
}

// Unfollow User
export const unFollowProfile = (req, res) => {
    console.log(req.params);
    res.status(200).send({
        status: "Success",
        data: [],
        message: "User profile has been deleted"
    })
}