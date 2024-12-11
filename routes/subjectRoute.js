const express = require('express');
const router = express.Router();
const { subjectController } = require('../controllers/subjectController');
const { validate } = require("../middlewares/validate");
const { authentication } = require('../middlewares/authentication');

router.post('/create', authentication, subjectController.createSubject);
router.get("/all", authentication, subjectController.getAll);
router.get("/one/:id", authentication, subjectController.getOne);
router.delete("/delete/:id", authentication, subjectController.deleteOne);

module.exports = router;
