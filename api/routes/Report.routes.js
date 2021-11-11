const multer = require("multer");
const express = require("express");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});
const {
  AddReport,
  GetAllUsersForReport,
  DeleteReport,
  GetReport,
  GiveReportAccessToUser,
  ChangeReportName,
} = require("../controllers/Report.controllers");
const CheckJWT = require("../middleware/jwt.middleware");

const router = express.Router();

router.post("/add-report", CheckJWT, upload.single("file"), AddReport);
router.get("/get-all-users-for-report/:_id", CheckJWT, GetAllUsersForReport);

router.put('/change-report-name',CheckJWT,ChangeReportName)

router.post("/delete-report", CheckJWT, DeleteReport);

router.get("/get-report/:_id", CheckJWT, GetReport);

router.put("/give-report-access-to-user", CheckJWT, GiveReportAccessToUser);

module.exports = router;
