const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { passwordResetSchema, validate } = require("../validator/validator");

const saltRounds = 10;

const passwordResetController = {
  resetPassword: async (req, res) => {
    const { token } = req.params;
    
    const { error, value } = passwordResetSchema.validate(req.body, { abortEarly: false});
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { password: newPassword, email } = value;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const decodedEmail = decoded?.email;

      if (!decodedEmail) {
        return res.status(400).send({
          statusCode: 400,
          message: "Invalid or expired token.",
        });
      }

      if (email !== decodedEmail) {
        return res.status(401).send("Invalid email");
      }

      const user = await User.findOne({ where: { email: decodedEmail } });
      if (!user) {
        return res.status(404).send(`User not found. Please register first.`);
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      
      // Update user's password
      user.password = hashedPassword;
      await user.save();

      res.status(200).send({ message: "Password updated successfully. You can now log in with your new password." });

    } catch (err) {
      console.error("Reset password error:", err);
      return res.status(500).send({ message: "Something went wrong", error: err.message });
    }
  },
};

module.exports = passwordResetController;
