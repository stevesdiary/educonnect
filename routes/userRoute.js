const express = require('express');
const router = express.Router();
const { validateUser } = require('../middlewares/validate');
const { userController } = require('../controllers/userController');
const { authentication } = require("../middlewares/authentication");
const { validate } = require("../middlewares/validate");
const { createUserSchema, idSchema } = require('../validator/validator');
const { loginController } = require('../controllers/loginController');


router.post('/create', userController.createUser);
router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
router.get ('/allusers', userController.getAll);
router.get('/getone/:id', userController.getOne);
router.patch('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteOne);
module.exports = router;
