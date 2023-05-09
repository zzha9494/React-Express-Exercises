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

controller.checkpswd = (req,res) => {
  let useremail = req.body.email,pswd = req.body.password;
  //TODO : database check

  var userdata;
  var checked = true

  User.findOne({email:useremail,password:pswd},
    function(err,res){
      if(err){
        checked = false;
      }else{
        userdata = res;
      }
    }
    )

  if(checked){
    req.session.userinfo = userdata.id
    res.send({code:0,msg:'ok'})
  }else{
    res.send({code:1,msg : 'error'})
  }
  
}


controller.checklogin = (req,res) =>{
  console.log("checking login")
  if(req.session.userinfo){
    var user = req.session.userinfo;
    res.send({
      code: 0
    });
  }else{
    res.send('alert("login first!");location.href = "./login.html"')
  }
}



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
