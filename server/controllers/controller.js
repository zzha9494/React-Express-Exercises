import { Phone, User } from "../models/dataModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const controller = {};
const saltRounds = 10;

controller.changePassword = (req, res) => {
  const { currentPassword, newPassword, _id } = req.body;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid user" });
      }

      bcrypt
        .compare(currentPassword, user.password)
        .then((result) => {
          if (result) {
            bcrypt
              .hash(newPassword, saltRounds)
              .then((hashedPassword) => {
                user.password = hashedPassword;

                user
                  .save()
                  .then(() => {
                    res
                      .status(200)
                      .json({ message: "Password changed successfully" });
                  })
                  .catch(() => {
                    res
                      .status(500)
                      .json({ message: "Failed to change password" });
                  });
              })
              .catch(() => {
                res.status(500).json({ message: "Internal server error" });
              });
          } else {
            return res.status(401).json({ message: "Wrong password" });
          }
        })
        .catch(() => {
          res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch(() => {
      res.status(500).json({ message: "Internal server error" });
    });
};

controller.editProfile = (req, res) => {
  const { _id, firstname, lastname, email, password } = req.body;

  User.findById(_id).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result) {
          User.findOne({ email: email })
            .then((existingUser) => {
              if (existingUser && existingUser._id.toString() !== _id) {
                return res
                  .status(409)
                  .json({ message: "Email already exists" });
              }

              user.firstname = firstname;
              user.lastname = lastname;
              user.email = email;

              user
                .save()
                .then(() => {
                  res.status(200).json({
                    message: "Profile updated successfully",
                    profile: { firstname, lastname, email, _id },
                  });
                })
                .catch((error) => {
                  res.status(500).json({ message: "Failed to update profile" });
                });
            })
            .catch(() => {
              res.status(500).json({ message: "Internal server error" });
            });
        } else {
          return res.status(401).json({ message: "Invalid email or password" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Internal server error" });
      });
  });
};

controller.getProfile = (req, res) => {
  const token = req.query.id;

  jwt.verify(token, "Zijie Zhao", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid" });
    }

    const userId = decodedToken.userId;

    User.findById(userId)
      .select("_id firstname lastname email")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });
};

controller.checkout = (req, res) => {
  const data = req.body;

  const updatePromises = data.map((item) => {
    const { _id, quantity } = item;

    return Phone.findById(_id)
      .then((phone) => {
        if (phone) {
          phone.stock -= quantity;
          phone.save();
        }
      })
      .catch((error) => {
        console.error(`Error updating stock for phone with ID ${_id}:`, error);
      });
  });

  Promise.all(updatePromises)
    .then(() => {
      res.status(200).json({ message: "Transcation comfirmed successfully." });
      console.log("Update successfully.");
    })
    .catch((error) => {
      console.error("Error updating stock:", error);
      res.status(500).json({ message: "Error." });
    });
};

controller.searchByTitle = (req, res) => {
  const title = req.query.title;

  Phone.find({ title: { $regex: title, $options: "i" } })
    .then((phones) => {
      res.status(200).json(phones);
    })
    .catch((e) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

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
            const token = jwt.sign({ userId: newUser._id }, "Zijie Zhao");
            res
              .status(201)
              .json({ message: "User created successfully", token });
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
          const token = jwt.sign({ userId: user._id }, "Zijie Zhao");
          return res.status(200).json({ message: "Login successfully", token });
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
