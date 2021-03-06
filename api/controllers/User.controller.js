const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
const ReportModel = require("../models/Report.model");

exports.GetAllAccessedReportsForUser = (req, res, next) => {
  const { email } = res.locals;
  if (!email)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  UserModel.findOne({
    email,
  })
    .then(async (user) => {
      const reports = [];
      for (let report of user.accessedReports) {
        const reportData = await ReportModel.findById(report);
        reports.push(reportData);
      }
      return res.status(200).json({
        success: true,
        reports,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.GetAllReportsForUser = (req, res, next) => {
  const { email } = res.locals;
  UserModel.findOne({
    email,
  })
    .then(async (user) => {
      const reports = [];
      console.log(user.reports);
      for (let report of user.reports) {
        const reportData = await ReportModel.findById(report);
        reports.push(reportData);
      }
      console.log(reports)
      return res.status(200).json({
        success: true,
        reports,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.GetAllUsers = (req, res, next) => {
  return UserModel.find({})
    .then((users) => {
      return res.status(200).json({
        success: true,
        users,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.SignUp = async (req, res, next) => {
  const { email } = req.body;

  const emailCheck = await UserModel.find({
    email,
  });
  if (emailCheck.length !== 0) {
    return res.status(500).json({
      success: false,
      message: "Email already exists!",
    });
  }
  const newUser = new UserModel(req.body);

  newUser
    .save()
    .then(async (n) => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("Error!");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.GetSharedReportsByUser = async (req, res, next) => {
  const user = await UserModel.findById(res.locals.uid);
  const reports = [];
  for (let uid of user.reports) {
    const report = await ReportModel.findOne({
      _id: uid,
    });
    if (report.access.length === 0) continue;
    reports.push(report);
  }
  return res.status(200).json({
    success: true,
    reports,
  });
};

exports.SignIn = (req, res, next) => {
  console.log("called");
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  let HASH = process.env.JWT_HASH;
  UserModel.findOne({
    email,
  })
    .then(async (user) => {
      if (user) {
        const check = await user.MatchPassword(password);

        if (!check) {
          console.log("Error");

          return res.status(500).json({
            success: false,
            message: "Unknown server error!",
          });
        }

        if (!HASH) {
          throw new Error("Hash not provided!");
        }
        const userData = user;
        const token = jwt.sign(
          {
            userData,
          },
          HASH,
          {
            expiresIn: "10h",
          }
        );
        return res.status(200).json({
          success: true,
          token,
          userData: userData,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Username does not exist!",
        });
      }
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.CheckedSignedIn = (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "User is signed in!",
  });
};

exports.UpdateUserHealthInfo = (req, res, next) => {
  UserModel.findByIdAndUpdate(
    {
      _id: res.locals.uid,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((u) => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!??",
      });
    });
};

exports.UpdateUserDetails = (req, res, next) => {
  const newDetails = req.body;
  if (!res.locals.uid || !newDetails)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  return UserModel.findOneAndUpdate(
    {
      _id: res.locals.uid,
    },
    newDetails,
    {
      new: true,
    }
  )
    .then((u) => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.GetUserDetails = (req, res, next) => {
  const { email } = res.locals;
  if (!email)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  return UserModel.findOne({
    email,
  })
    .then((user) => {
      return res.status(200).json({
        success: true,
        user: user,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};
