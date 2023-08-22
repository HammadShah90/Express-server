export const getProfile = (req, res) => {
    console.log(req.params);
    res.status(200).send({
        status: "Success",
        data: [],
        message: "It's user profile"
    })
}

export const updateProfile = (req, res) => {
    console.log(req.params);
    res.status(200).send({
        status: "Success",
        data: [],
        message: "User profile has been updated"
    })
}