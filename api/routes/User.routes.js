const express = require("express");
const {
  GetAllAccessedReportsForUser,
  GetAllReportsForUser,
  GetAllUsers,
  SignUp,
  SignIn,
  CheckedSignedIn,
  UpdateUserDetails,
  GetUserDetails,
  GetSharedReportsByUser,
} = require("../controllers/User.controller");
const CheckJWT = require("../middleware/jwt.middleware");

const router = express.Router();

router.get(
  "/get-all-accessed-reports-for-user",
  CheckJWT,
  GetAllAccessedReportsForUser
);

router.get("/get-all-reports-for-user", CheckJWT, GetAllReportsForUser);

router.get("/get-all-users", CheckJWT, GetAllUsers);

router.post("/sign-up", SignUp);

router.post("/sign-in", SignIn);

router.get("/check-signed-in", CheckJWT, CheckedSignedIn);

router.get('/get-shared-reports-by-user',CheckJWT,GetSharedReportsByUser)

router.put("/update-user-details", CheckJWT, UpdateUserDetails);

router.get("/get-user-details", CheckJWT, GetUserDetails);
module.exports = router;
