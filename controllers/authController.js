import User from '../models/user.js'
import bcrypt from 'bcrypt'

// User Registration
export const registration = async (req, res) => {
    console.log(`User Registration API`);
    // console.log(req.body);

    try {
        // generated hash user password ==>>
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        // created new user ==>>
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            password: hashedPassword,
        });
        
        // save user data and responsed==>>
        const user = await newUser.save()
        res.status(200).send(user)

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

}

// User Login
export const login = async (req, res) => {
    console.log(`User Login API`);

    try {
        const user = await User.findOne({userEmail: req.body.userEmail});

        if(!user) return res.status(404).send("User Not Found");

        // console.log(user.password);
        // console.log(user.userEmail);

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if(!validPassword) return res.status(404).send("Wrong password")

        res.status(200).send(user)

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}