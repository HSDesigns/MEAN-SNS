const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
const config = require('../config/database');

// const User = require('../models/user');
const connection = (closure) => {
  return MongoClient.connect(config.database, (err, client) => {
    if (err) return console.log(err);
    const db = client.db(config.secret);
    closure(db); 
  });
};
// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};
// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};
// Register
router.post('/register', (req, res, next) => {
  let newUser = {
    name: req.body.uid,
    email: req.body.email,
    username: req.body.email
  };
  console.log('req.body');
  console.log(req.body);
  try {
    console.log('try');
    connection((db) => {
      db.collection('users').insert(newUser, function (err, records) {
        console.log('err');
        if (err) {
          console.log(err);
          res.json({ success: false, msg: 'Failed to register user' });
        } else {
          console.log(records);
          res.json({
            success: true,
            msg: 'User registered'
          });
        }
      });
    });

  } catch (error) {
    console.log('error');
    res.status(500).json({ error: error.toString() });
  }
  
  // User.addUser(newUser, (err, user) => {
  //   if(err) {
  //     res.json({success: false, msg: 'Failed to register user'});
  //   } else {
  //     res.json({success: true, msg: 'User registered'});
  //   }
  // });
});

// Authenticate
// router.post('/authenticate', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.getUserByUsername(username, (err, user) => {
//     if(err) throw err;
//     if(!user) {
//       return res.json({success: false, msg: 'User not found'});
//     }

//     User.comparePassword(password, user.password, (err, isMatch) => {
//       if(err) throw err;
//       if(isMatch) {
//         const token = jwt.sign({data: user}, config.secret, {
//           expiresIn: 604800 // 1 week
//         });
//         res.json({
//           success: true,
//           token: 'JWT '+token,
//           user: {
//             id: user._id,
//             name: user.name,
//             username: user.username,
//             email: user.email
//           }
//         })
//       } else {
//         return res.json({success: false, msg: 'Wrong password'});
//       }
//     });
//   });
// });

// Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//   res.json({user: req.user});
// });
// Get users
router.get('/getAll', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/topCustomers', (req, res) => {
  connection((db) => {
    // const id = req.query.id;
    // const saleAmount = req.query.SaleAmount;
    // console.log(id);
    // console.log(saleAmount);
    console.log(req.route);

    const collection = db.collection('users');
    collection.aggregate()
      //.match(qb.where("status").eq("A"))
      //.project("gender _id")
      //.unwind("$arrayField")
      .group({ _id: req.query.id, SaleAmount: { $sum: req.query.SaleAmount } })
      .sort({ 'SaleAmount': -1 })
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
module.exports = router;
