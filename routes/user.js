const express = require("express");
const userController = require('../controllers/user-controller')
const router = express.Router();

router
    .get('/', userController.findAll)
    .get('/:username', userController.findOne)
    .post('/', userController.register)
    .post('/:username', userController.login)
    .patch('/:username', userController.update)
    .delete('/:username', userController.delete)
module.exports = router;