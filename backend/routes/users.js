const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateSignUpInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");
//secret
require("dotenv").config();
const SECRET = process.env.SECRET;

let User = require('../models/user.model');


// signup POST request
router.post('/add', (req, res) => {
    const userInfo = req.body;
    console.log("Adding User");
    const email = userInfo.email;

    User.findOne({ $or: [{ email }] }).then(user => {
        if (user) {
            if (user.email === email)
                return res.status(400).json({ email: "Email already exists" });
            else
                return res
                    .status(400)
                    .json({ user_name: "Username already exists" });
        } else {
            const newUser = new User(userInfo);
            console.log(newUser);
            // encrypt passwords
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                   newUser.password = hash;
                   console.log(newUser);
                   newUser
                      .save()
                      .then(user => res.json(user))
                      .catch(err =>{
                         console.log("Error adding new User");
                         console.log(err);
                      }
                    );
                });
            });
        }
    });});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ password: "Incorrect Login Information" });
        }
    bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                id: user.id,
                username: user.username
                };
                console.log(payload.id);
                jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    console.log(err);
                }
                return res.json({
                    success: true,
                    token: "Bearer " + token
                });
                });
            } else {
                return res.status(400).json({ password: "Incorrect Login Information" });
            }
        });
    });
    });

            


module.exports = router;