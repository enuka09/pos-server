const userSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const salt = 10;
const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');

// User Registration
const register = (req, resp) => {

    userSchema.findOne({'email': req.body.email}).then(result => {
        if (result == null) {

            // Encrypt the Password
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) {
                    return resp.status(500).json(err);
                }
                const user = new userSchema({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hash,
                    activeState: req.body.activeState
                });

                // Send a Mail to the Email
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'pinsaradampitiya@gmail.com',
                        pass: 'xpzk pmrd eunm hsrl'
                    }
                });

                const mailOption = {
                    from: 'pinsaradampitiya@gmail.com',
                    to: req.body.email,
                    subject: 'New Account Creation',
                    text: 'You have Created Your Account!'
                }

                transporter.sendMail(mailOption, function (error, info) {
                    if (error) {
                        return resp.status(500).json({'error': error})
                    } else {
                        user.save().then(saveResponse => {
                            return resp.status(201).json({'message': 'Saved!'});
                        }).catch(error => {
                            return resp.status(500).json(error);
                        });
                    }
                });
            });
        } else {
            return resp.status(409).json({'error': 'Already Exists!'});
        }
    });
}

// User Login
const login = (req, resp) => {
    userSchema.findOne({'email': req.body.email}).then(selectedUser => {
        if (selectedUser !== null) {
            bcrypt.compare(req.body.password, selectedUser.password, function (err, result) {
                if (err) {
                    return resp.status(500).json({'message': 'Internal Server Error!'});
                }

                if (result) {
                    const payload = {
                        email: selectedUser.email
                    }

                    const secretKey = process.env.SECRET_KEY;
                    const expiresIn = '24h';

                    const token = jsonwebtoken.sign(payload, secretKey, {expiresIn});
                    return resp.status(200).json({'token': token});
                } else {
                    return resp.status(401).json({'message': 'Password is Incorrect!'})
                }


            });
        } else {
            return resp.status(404).json({'message': 'Not Found!'});
        }
    });
}

module.exports = {
    register, login
}

