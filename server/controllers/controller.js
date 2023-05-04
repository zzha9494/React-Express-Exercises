import { Phone, User } from "../models/dataModel.js";

const controller = {};

controller.getFive = (req, res) => {
  Phone.find({})
    .limit(5)
    .then((phones) => {
      res.json(phones);
    })
    .catch((e) => {
      console.log("Query error:", err);
    });
};

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

export default controller;
