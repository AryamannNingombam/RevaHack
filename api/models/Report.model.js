//date,user,id,doctorid,file || url
const mongoose = require('mongoose')
const DoctorModel = require('./Doctor.model');


const ReportSchema = new mongoose.Schema({
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
ReportSchema.methods.AddDoctor = async function (
    newDoctor
) {
    const report = this
    const doc = await DoctorModel.findById({
        _id: newDoctor
    })
    await doc.AddReport(report._id)
    report.doctors.push(newDoctor)
    await report.save()
    return
}

ReportSchema.methods.DeleteReportData = async function () {
    const report = this
    const doctors = report.doctors
    for (let doctor of doctors) {
        const doc = await DoctorModel.findById({
            _id: doctor
        })
        if (!doc) throw new Error('Doctor not found!')
        await doc.DeleteReport(report._id)
    }
    return
}

ReportSchema.methods.CheckIfDoctorInWhitelist = async function (
    doctorId,
) {
    const report = this
    const doctors = report.doctors
    return doctors.indexOf(doctorId) > -1
}

module.exports = mongoose.model('Report', ReportSchema)