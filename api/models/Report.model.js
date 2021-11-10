//date,user,id,doctorid,file || url
const mongoose = require('mongoose')
const UserModel = require('./User.model');


const ReportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    access: {
        type: [mongoose.Types.ObjectId],
        default: [],
        required: true,
    },
    metadata: {
        type: {
            secretKey: {
                type: String,
                required: true,
            },
            hash: {
                type: String,
                required: true,
                unique: true,
            },
        },
        required: true,
    },
    date: {
        type: Date,
        required: true,
        unique: true,
        default: new Date(Date.now()),
    },
})

ReportSchema.methods.ChangeMetadata = async function (newMetadata) {
    const report = this
    report.metadata = newMetadata
    await report.save()
}
ReportSchema.methods.UpdateDate = async function () {
    const report = this
    report.date = new Date(Date.now())
    await report.save()
}
ReportSchema.methods.AddUser = async function (
    newUser
) {
    const report = this
    const user = await UserModel.findById({
        _id: newUser
    })
    await user.AddReport(report._id)
    report.access.push(newUser)
    await report.save()
    return
}

ReportSchema.methods.DeleteReportData = async function () {
    const report = this
    const users = report.users
    for (let user of users) {
        const u = await UserModel.findById({
            _id: user
        })
        if (!u) throw new Error('User not found!')
        await u.DeleteReport(report._id)
    }
    return
}

ReportSchema.methods.CheckIfUserInWhitelist = async function (
    userId,
) {
    const report = this
    const users = report.access
    return users.indexOf(userId) > -1
}

module.exports = mongoose.model('Report', ReportSchema)