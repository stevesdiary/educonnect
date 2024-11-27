const express = require('express');
const router = express.Router();
const { answerController } = require('../controllers/answerController');
const { validate } = require("../middlewares/validate");
const { answerSchema, idSchema } = require('../validator/validator');
const { authentication } = require('../middlewares/authentication');

router.post('/create/:question_id', authentication, answerController.createAnswer);
router.get ('/allanswers/:id', authentication, answerController.getAll);
router.get('/getone/:id', authentication, answerController.getOne); 
router.patch('/update/:id', authentication, answerController.updateAnswer);
router.delete('/deleteanswer/:id', authentication, answerController.deleteOne);
module.exports = router;
