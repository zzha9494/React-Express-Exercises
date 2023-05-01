import mongoose from "./db.js";

const phoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    enum: [
      "Samsung",
      "Apple",
      "HTC",
      "Huawei",
      "Nokia",
      "LG",
      "Motorola",
      "Sony",
      "BlackBerry",
    ],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      hidden: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Phone = mongoose.model("Phone", phoneSchema);
const User = mongoose.model("User", userSchema);

export { Phone, User };
