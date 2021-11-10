const ReportModel = require("../models/Report.model");
const UserModel = require("../models/User.model");
const crypto = require("crypto");
const ipfs = require("ipfs-http-client");
const client = ipfs.create("https://ipfs.infura.io:5001/api/v0");
// sample report 618bb2d54bc63132dcc0ac6f
exports.AddReport = async (req, res, next) => {
  if (req.file) {
    let body = req.body;
    const algorithm = "aes-256-cbc";
    const secretKey = res.locals.key + res.locals.key;
    const iv = "5183666c72eec9e4";
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const crypted = Buffer.concat([
      cipher.update(req.file.buffer),
      cipher.final(),
    ]);
    console.log(crypto.createHash("sha256").update(crypted).digest("hex"));
    console.log(crypted.length);
    const data = await client.add(crypted);
    let hash = data.path;
    const user = await UserModel.findOne({
      email: res.locals.email,
    });
    if (!user)
      return res.status(500).json({
        success: false,
        message: "User not found!",
      });
    console.log(hash);
    const reportBody = {
      user: user._id,
      metadata: {
        hash,
        secretKey,
      },
      date: new Date(Date.now()),
    };
    ReportModel.create(reportBody)
      .then(async (r) => {
        await UserModel.findByIdAndUpdate(user._id, {
          $push: {
            reports: r._id,
          },
        });
        return res.status(200).json({
          success: true,
          metadata: {
            hash,
            secretKey,
          },
          id: r._id,
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
  } else {
    return res.status(500).json({
      success: false,
      error: "No file attached",
    });
  }
};

exports.GiveReportAccessToUser = async (req, res, next) => {
  const { reportId, email } = req.body;
  if (!reportId || !email) {
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  }
  const report = await ReportModel.findOne({
    _id: reportId,
    user: req.user.userData,
  });
  if (!report) {
    return res.status(500).json({
      success: false,
      message: "No report found",
    });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "No user found",
    });
  }
  return report
    .AddUser(user._id)
    .then(() => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error",
      });
    });
};

exports.GetAllUsersForReport = (req, res, next) => {
  const { _id } = req.params;
  if (!_id)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  ReportModel.findById({
    _id,
  })
    .then(async (report) => {
      const userDetails = [];
      for (let user of report.access) {
        const userDetail = await UserModel.findById({
          _id: user,
        });
        userDetails.push(userDetail);
      }
      return res.status(200).json({
        success: true,
        userDetails,
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

exports.DeleteReport = async (req, res, next) => {
  const { _id } = req.body;
  if (!_id)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  const report = await ReportModel.findById({
    _id,
  });
  if (!report)
    return res.status(500).json({
      success: false,
      message: "Report not found!",
    });
  await report.DeleteReportData();
  report
    .delete()
    .then(() => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("Error");
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Unknown server error!",
      });
    });
};

exports.GetReport = async (req, res, next) => {
  const { _id } = req.params;
  if (!_id)
    return res.status(500).json({
      success: false,
      message: "Required values not provided!",
    });
  return ReportModel.findOne({
    _id,
    user: req.user.userId,
  })
    .then(async (report) => {
      console.log(report);
      if (!report)
        return res.status(500).json({
          success: false,
          message: "Report not found!",
        });
      const algorithm = "aes-256-cbc";
      const iv = "5183666c72eec9e4";
      const hash = report.metadata.hash;
      const secretKey = report.metadata.secretKey;
      const recData = await client.cat(hash);
      var data = new Uint8Array();
      for await (const item of recData) {
        prevData = data;
        data = new Uint8Array(data.length + item.length);
        data.set(prevData);
        data.set(item, prevData.length);
      }
      console.log(crypto.createHash("sha256").update(data).digest("hex"));
      console.log(data.length);
      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
      let decData = decipher.update(data);
      decData = Buffer.concat([decData, decipher.final()]);
      return res.status(200).json({
        success: true,
        report,
        data: decData.toString("base64"),
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
