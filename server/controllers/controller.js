import { Phone, User } from "../models/dataModel.js";

const controller = {};

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

// test
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
// test

export default controller;
