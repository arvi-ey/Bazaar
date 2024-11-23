const UserModel = require("../Model/userModel")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.UserSignIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(404).json({ message: "Missing Data" })
    else {
        try {
            const user = await UserModel.findOne({ email })
            if (!user) return res.status(404).json({
                message: "This email doesnot exists, please sign up first",
                user: null,
                authenticate: false
            })
            else {
                const checkPassword = await bcrypt.compare(password, user.password)
                if (checkPassword === false) {
                    console.log(checkPassword)
                    res.status(401).json({ message: "Wrong email or password", user: false })
                }
                else {
                    const sessionData = jwt.sign({ id: user._id, role: user.userType }, process.env.JWT_SECRET,);
                    res.cookie('token', sessionData, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'None',
                        maxAge: 60 * 24 * 60 * 60 * 1000
                    });
                    res.status(200).json({
                        message: "User loggedin succcesfully",
                        user: user,
                        authenticate: true,
                        session: sessionData
                    })
                }
            }
        }
        catch (error) {
            return res.status(500).json({
                message: error
            })
        }

    }
}

exports.UserSignUp = async (req, res) => {
    const { name, email, phone_number, password } = req.body
    if (!name || !email || !phone_number || !password) res.status(404).json({ message: "Missing Data" })
    else {
        const emailExist = await UserModel.findOne({ email })
        if (emailExist) res.status(409).json({ message: "Email already exists", error: "email", user: false })
        else {
            const numberExist = await UserModel.findOne({ phone_number })
            if (numberExist) res.status(409).json({ message: "Phone number already exists", error: "phone", user: false })
            else {
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hassedPassword = await bcrypt.hash(password, salt)
                    const userData = await UserModel.create({ ...req.body, password: hassedPassword })
                    const sessionData = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: "User successfully created",
                        user: true,
                        data: userData,
                        session: sessionData
                    })
                }
                catch (error) {
                    res.status(500).json({
                        message: error,
                        user: false
                    })
                }
            }
        }

    }

}
