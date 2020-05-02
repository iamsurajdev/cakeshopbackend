var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    },

    local: {
      email: {
        type: String,
        lowercase: true,
      },
      password: {
        type: String,
      },
    },
    google: {
      id: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
    },
    facebook: {
      id: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
      },
    },
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
