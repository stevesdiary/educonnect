const express = require('express');
const router = express.Router();
const { subjectController } = require('../controllers/subjectController');
const { validate } = require("../middlewares/validate");
const { authentication } = require('../middlewares/authentication');

router.post('/create', authentication, subjectController.createSubject);


module.exports = router;
