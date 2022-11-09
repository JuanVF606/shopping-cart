const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  run: { type: String, required: true, unique: true },
  nombre_completo: {
    type: String,
    required: [true, "Porfavor ingrese su nombre completo"],
  },
  direccion: {
    type: String,
    required: [true, "Porfavor ingrese su dirección"],
  },
  comuna: { type: String, required: [true, "Por favor ingrese su comuna"] },
  provincia: {
    type: String,
    required: [true, "Por favor ingrese su provincia"],
  },
  region: { type: String, required: [true, "Porfavor ingrese su región"] },
  fecha_nacimiento: {
    type: String,
    required: [true, "Ingrese su fecha de nacimiento"],
  },
  sexo: { type: String, require: true },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  numero_telefono: {
    type: String,
    required:[true]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      url: {
        type: String,
        required: [true, "Please add image for you profile"],
      },
    },
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// return JWT token
userSchema.methods.getJWtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
