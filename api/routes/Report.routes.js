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
  GetReportOfOtherUser,
} = require("../controllers/Report.controllers");
const CheckJWT = require("../middleware/jwt.middleware");

const router = express.Router();

router.post("/add-report", CheckJWT, upload.single("file"), AddReport);
router.get("/get-all-users-for-report/:_id", CheckJWT, GetAllUsersForReport);

router.get("/get-report-of-other-user/_id", CheckJWT, GetReportOfOtherUser);
router.post("/delete-report", CheckJWT, DeleteReport);

router.get("/get-report/:_id", CheckJWT, GetReport);

router.put("/give-report-access-to-user", CheckJWT, GiveReportAccessToUser);

module.exports = router;
