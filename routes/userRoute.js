const express = require('express');
const router = express.Router();
const { validateUser } = require('../middlewares/validate');
const { userController } = require('../controllers/userController');
const { validate } = require("../middlewares/validate");
const { createUserSchema, idSchema } = require('../validator/validator');


router.post('/create', validate(createUserSchema, 'body'), userController.createUser);
router.get ('/allusers', userController.getAll);
router.get('/getone/:id', validate(idSchema, 'param'), userController.getOne);
router.patch('/update/:id', validate(idSchema, 'param'), userController.updateUser);
router.delete('/deleteuser/:id', validate(idSchema, 'param'), userController.deleteOne);
module.exports = router;
