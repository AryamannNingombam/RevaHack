const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');



const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    // age: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    // },
    phoneNumber: {
        type: Number,
        required: true,
    },
    reports: {
        type: [mongoose.Types.ObjectId],
        required: true,
        default: [],
    },
    council: {
        type: String,
        required: true,
    },
    // clinicDetails: {
    //   type: {
    //     city: {
    //       type: String,
    //       required: true,
    //     },
    //     state: {
    //       type: String,
    //       required: true,
    //     },
    //     pinCode: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    //   required: true,
    // },
    degreesAndSpecializations: {
        type: {
            degree: {
                type: String,
                required: true,
            },
            postGraduation: {
                type: String,
                required: true,
            },
            specializations: {
                type: String,
                required: true,
            },
            certifications: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: Number,
        required: true,
        unique: true,
    },
})

DoctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

DoctorSchema.methods.MatchPassword = async function (password) {
    const user = this
    return await bcrypt.compare(password, user.password)
}

DoctorSchema.methods.GetUserData = async function () {
    const user = this
    return {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
    }
}

DoctorSchema.methods.AddReport = async function (
    newReport
) {
    const doctor = this
    doctor.reports.push(newReport)
    await doctor.save()
}
DoctorSchema.methods.DeleteReport = async function (
    _id
) {
    const doctor = this
    const reports = doctor.reports
    let index = 0
    while (index < reports.length) {
        if (reports[index] === _id) reports.splice(index, 1)
    }
    doctor.reports = reports
    await doctor.save()
}

DoctorSchema.methods.CheckIfReportAllowedAccess = async function (
    reportId,
) {
    const doctor = this
    const reports = doctor.reports
    return reports.indexOf(reportId) > -1
}

module.exports = mongoose.model('Doctor', DoctorSchema)