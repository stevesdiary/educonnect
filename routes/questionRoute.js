const express = require('express');
const router = express.Router();
const { questionController } = require('../controllers/questionController');
const { validate } = require("../middlewares/validate");
const { questionSchema, idSchema } = require('../validator/validator');
const { authentication } = require('../middlewares/authentication');

router.post('/create', authentication, questionController.createQuestion);


module.exports = router;
