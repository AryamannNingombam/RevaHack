const express = require('express');
const { AddReport, GetAllUsersForReport, DeleteReport, GetReport, GiveReportAccessToUser } = require('../controllers/Report.controllers');
const CheckJWT = require('../middleware/jwt.middleware');

const router = express.Router();


router.post('/add-report',CheckJWT,AddReport);
router.get('/get-all-users-for-report/:_id',CheckJWT,GetAllUsersForReport);

router.post('/delete-report',CheckJWT,DeleteReport);

router.get('/get-report/:_id',CheckJWT,GetReport);


router.put('/give-report-access-to-user',CheckJWT,GiveReportAccessToUser)

module.exports = router;