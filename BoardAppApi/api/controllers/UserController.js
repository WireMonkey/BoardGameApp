'use strict';
let fs = require('fs');
const bcrypt = require('bcrypt');
const Chance = require('chance');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const chance = new Chance();
const saltRounds = 10;
let users = [];

try {
    fs.readFile('DB/Users.txt', function(err, data) { 
      if (err) {
        console.log(err);
      }
      users = JSON.parse(data.toString('utf8'));
    });
  } catch (error) {
    console.log(error);
  }

exports.CreateUser = async function (req, res) {
    try {
        let hash = await HashPassword(req.body.userName, req.body.password);
        let userId = await SaveUser(req.body.userName, hash);

        fs.writeFile('DB/Users.txt', JSON.stringify(users), function (err) {
            if (err) {
              console.log(err);
              res.status(500).send(error);
            }
            res.json({message: 'Data Saved.'});
          });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.ValidateUser = async function (req, res) {
    try {
        let user = users.find(x => x.userName === req.body.userName);
        if (user) {
            let correct = await CheckPassword(req.body.userName, req.body.password, user.password);
            if (correct) {
                let token = await GenerateJwt(user._id);
                res.json(token);
            } else {
                res.status(401).json('Login invalid');
            }
        } else {
            res.status(401).json('Login invalid');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.refreshJwt = async function (req, res) {
    try {
        let userId = req.decoded.userId;
        let user = users.find(x => x._id === userId);
        if (user) {
            let token = await GenerateJwt(user._id);
            res.json(token);
        } else {
            res.status(401).json('Login invalid');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.SetResetPassword = async function (req, res) {
    try {
        let user = users.find(x => x.userName === req.body.userName);
        let resetHash = chance.hash({length: 50});
        if (user) {
            user.password = chance.hash({length: 25});
            user.resetHash = resetHash;
            res.json(resetHash);
        } else {
            res.json('');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.ResetPassword = async function (req, res) {
    try {
        let user = users.find(x => x.resetHash === req.body.resetHash);
        let hash = await HashPassword(user.userName, req.body.password);
        user.password = hash;
        user.resetHash = '';
        res.status(200).json('success');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getUserData = async function(req, res) {
    try {
        let userId = req.decoded.userId;
        let user = users.find(x => x._id === userId);
        res.status(200).json({userName: user.userName, email: user.email});
    } catch (error) {
        res.status(500).send(error);
    }
}

async function HashPassword(userName, password) {
    let uPass = userName + '.' + password;
    let hash = await bcrypt.hash(uPass, saltRounds);
    return hash
}

async function CheckPassword(userName, password, hashPassword) {
    let uPass = userName + '.' + password;
    let correct = await bcrypt.compare(uPass, hashPassword);
    return correct;
}

async function SaveUser(userName, hashPassword) {
    let user = users.find(x => x.userName === userName);
    if (user) {
        throw Error('User already exists.');
    }

    let userId = chance.guid();
    users.push({ _id: userId, userName: userName, password: hashPassword });
    return userId;
}

async function GenerateJwt(userId) {
    let token = jwt.sign({userId: userId},
        config.secret,
        { expiresIn: '24h' // expires in 24 hours
        }
      );

    return token;
}
