const express = require('express');
const router = express.Router();
const { loginController } = require('../controllers/loginController');


router.post('/login', loginController.login);
router.get("/google", loginController.google);
router.post("/logout", loginController.logout)


module.exports = router;
