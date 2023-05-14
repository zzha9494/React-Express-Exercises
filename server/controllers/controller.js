import { Phone, User } from "../models/dataModel.js";
import bcrypt from "bcrypt";

const controller = {};
const saltRounds = 10;

controller.getSoldOutSoon = (req, res) => {
  Phone.find(
    {
      stock: { $gt: 0 },
      disabled: { $exists: false },
    },
    { seller: 0, reviews: 0 }
  )
    .sort({ stock: 1 })
    .limit(5)
    .then((phones) => {
      res.json(phones);
    })
    .catch((e) => {
      console.log("Query error:", err);
    });
};

controller.getBestSellers = (req, res) => {
  Phone.aggregate([
    {
      $match: {
        disabled: { $exists: false },
        $expr: {
          $gte: [{ $size: "$reviews" }, 2],
        },
      },
    },
    {
      $unwind: "$reviews",
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        brand: { $first: "$brand" },
        image: { $first: "$image" },
        stock: { $first: "$stock" },
        price: { $first: "$price" },
        avg_rating: { $avg: "$reviews.rating" },
      },
    },
    {
      $sort: { avg_rating: -1 },
    },
    {
      $limit: 5,
    },
  ])
    .then((phones) => {
      res.json(phones);
    })
    .catch((e) => {
      console.log("Query error:", err);
    });
};

controller.signup = (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  User.findOne({ email }).then((result) => {
    if (result) {
      return res.status(409).json({ message: "Email already in use" });
    }

    bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        const newUser = new User({
          firstname,
          lastname,
          email,
          password: hash,
        });

        newUser
          .save()
          .then(() => {
            res.status(201).json({ message: "User created successfully" });
          })
          .catch(() => {
            res.status(500).json({ message: "Internal server error" });
          });
      })
      .catch(() => {
        res.status(500).json({ message: "Internal server error" });
      });
  });
};

controller.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result) {
          // return token or id
          // const token = jwt.sign({ userId: user._id }, secretKey);
          const token = "this is token";
          return res.status(200).json({ token });
        } else {
          return res.status(401).json({ message: "Invalid email or password" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Internal server error" });
      });
  });
};

// test below
controller.getPhone = (req, res) => {
  const id = req.query.id;

  Phone.findById(id)
    .populate({
      path: "seller",
      select: "firstname lastname",
    })
    .populate({
      path: "reviews.reviewer",
      model: "User",
      select: "firstname lastname",
    })
    .then((phone) => {
      res.json(phone);
    })
    .catch((e) => {
      console.log("Query error:", err);
    });
};
// test above

export default controller;
