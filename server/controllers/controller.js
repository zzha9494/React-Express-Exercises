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
// not work
controller.checkpswd = (req, res) => {
  // let useremail = req.body.email,
  //   pswd = req.body.password;
  // //TODO : database check

  console.log(req.body)

  // var userdata;
  // var checked = true;

  // User.findOne({ email: useremail, password: pswd }, function (err, res) {
  //   if (err) {
  //     checked = false;
  //   } else {
  //     userdata = res;
  //   }
  // });

  // if (checked) {
  //   req.session.userinfo = userdata.id;
  //   res.send({ code: 0, msg: "ok" });
  // } else {
  //   res.send({ code: 1, msg: "error" });
  // }
};

controller.checklogin = (req, res) => {
  console.log("checking login");
  if (req.session.userinfo) {
    var user = req.session.userinfo;
    res.send({
      code: 0,
    });
  } else {
    res.send('alert("login first!");location.href = "./login.html"');
  }
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
// test

export default controller;
