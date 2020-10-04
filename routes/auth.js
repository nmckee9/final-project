const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require('dotenv').config();
const config = require('../config/keys');
const jwt = require("jsonwebtoken");

// User model
const User = require("../models/User");

// POST api/auth. Authenticate the user

router.post("/api/auth", (req, res) => {
    const { email, password } = req.body;

    // Validation
    if ( !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields." })
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            // Validate password
            bcrypt.compare(password, user.password)
              .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." })

                jwt.sign(
                  //payload is user id
                  { id: user.id },
                  config.jwtSecretKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                      if (err) throw err;
                      res.json({
                          token,
                          user: {
                              id: user.id,
                              name: user.name,
                              email: user.email
                          }
                      })
                  }
              )
              })
        })
});

module.exports = router