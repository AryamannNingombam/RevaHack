const ReportModel = require("../models/Report.model");
const UserModel = require("../models/User.model");




exports.GetAllUsers = (req, res, next) => {
    return UserModel.find({})
        .then(users => {
            return res.status(200)
                .json({
                    success: true,
                    users
                })

        })
        .catch(err => {
            console.log(("error"));
            console.log(err);
            return res.status(500)
                .json({
                    success: false,
                    message: "Unknown server error!"

                })
        })
}


exports.GetAllUsersForReport = (req, res, next) => {
    const {
        _id
    } = req.params;
    if (!_id) return res.status(500)
        .json({
            success: false,
            message: "Required values not provided!"
        })
    ReportModel.findById({
            _id
        })
        .then(async report => {
            const doctorDetails = []
            for (let doctor of report.access) {
                const doctorDetail = await DoctorModel.findById({
                    _id: doctor
                })
                doctorDetails.push(doctorDetail)
            }
            return res.status(200)
                .json({
                    success: true,
                    doctorDetails
                })
        })
        .catch(err => {
            console.log('error');
            console.log(err)
            return res.status(500)
                .json({
                    success: false,
                    message: "Unknown server error!"
                })
        })
}