const UserModel = require("../models/User.model");






exports.SignUp = async (
    req,
    res,
    next,
) => {
    const {
        email
    } = req.body

    const emailCheck = await UserModel.find({
        email
    })
    if (emailCheck.length !== 0) {
        return res.status(500).json({
            success: false,
            message: 'Email already exists!',
        })
    }
    const newUser = new UserModel(req.body)

    newUser
        .save()
        .then(async (n) => {
            return res.status(200).json({
                success: true,
            })
        })
        .catch((err) => {
            console.log('Error!')
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Unknown server error!',
            })
        })
}


exports.SignIn = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) return res.status(500)
        .json({
            success: false,
            message: "Required values not provided!"
        })
    let HASH = process.env.JWT_HASH;
    UserModel.findOne({
            email
        })
        .then(async user => {
            if (user) {
                const check = await user.MatchPassword(password)

                if (!check) {
                    console.log('Error')

                    return res.status(500).json({
                        success: false,
                        message: 'Unknown server error!',
                    })
                }

                if (!jwtHash) {
                    throw new Error('Hash not provided!')
                }
                const userData = {
                    email: user.email,
                    password: user.password
                }
                const token = jwt.sign({
                    userData
                }, jwtHash, {
                    expiresIn: '10h',
                })
                return res.status(200).json({
                    success: true,
                    token,
                    userData: userData,
                })
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Username does not exist!',
                })
            }
        }).catch(err => {
            console.log("error");
            console.log(err);
            return res.status(500)
                .json({
                    success: false,
                    message: "Unknown server error!"
                })
        })
}


exports.CheckedSignedIn = (req, res, next) => {
    return res.status(200)
        .json({
            success: true,
            message: "User is signed in!"
        })
}




exports.GetUserDetails = (req, res, next) => {
    const {
        email
    } = req.user;
    if (!email) return res.status(500)
        .json({
            success: false,
            message: "Required values not provided!"
        })
    return UserModel.findOne({
            email
        })
        .then(user => {
            return res.status(200)
                .json({
                    success: true,
                    user: user.GetUserData()
                })
        })
        .catch(err => {
            console.log('error');
            console.log(err);
            return res.status(500)
                .json({
                    success: false,
                    message: "Unknown server error!"
                })
        })

}