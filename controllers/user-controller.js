const userModel = require('../models/user-model')
const UserModel = require("./user-controller");

exports.register = async(req, res) => {
    if(!req.body.username && !req.body.firstName && !req.body.lastName && !req.body.password){
        res.status(400).send({ message: "Content can not be empty!"});
    }

    const user = new userModel({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    await user.save().then(data => {
        res.send({
            message:"User created successfully!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error NO. 500"
        });
    });
};

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await UserModel.findOne({username: username}, function (err, foundUser) {
        if (err) {
            res.send("404")
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                }
            }
        }
    });
};

// retrieve all users from db
exports.findAll = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json(user);
    } catch(error){
        res.status(404).json({message: error.message});
    }
};

// find with username
exports.findOne = async (req, res) => {
    try {
        const user = await userModel.findByUsername(req.params.username);
        res.status(200).json(user);
    } catch(error){
        res.status(404).json({message: error.message});
    }
};

// update user by username
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const username = req.params.username;

    await userModel.findByUsernameAndUpdate(username, req.body, { useFindAndModify: false}).then(data => {
        if(!data) {
            res.status(404).send({
                message: 'User not found'
            });
        } else {
            res.send({message: "User updated successfully"});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// delete user by username
exports.delete = async (req, res) => {
    await userModel.findByUsernameAndRemove(req.params.username).then(data => {
        if(!data) {
            res.status(404).send({
                message: 'User not found'
            });
        } else {
            res.send({message: "User deleted successfully"});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};