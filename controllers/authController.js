export const registration = (req, res) => {
    console.log(`User Registration API`);
    console.log(req.body);
    res.status(200).send({
        status: "Success",
        message: "User Signup Successfull"
    })
}

export const login = (req, res) => {
    console.log(`User Login API`);
    res.status(200).send({
        status: "Success",
        message: "User Login Successfull"
    })
}