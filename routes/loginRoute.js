const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers/loginController');


router.post('/', loginController.login);
router.get("/google", loginController.google);
router.get("/", loginController.)


module.exports = router;
