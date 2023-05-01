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

export default controller;
