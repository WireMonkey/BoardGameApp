'use strict';
let fs = require('fs');
const bcrypt = require('bcrypt');
const Chance = require('chance');
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
            res.json({message: 'Data Saved.', Id: userId});
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
                res.json(user._id);
            } else {
                res.status(400).json('Login invalid');
            }
        } else {
            res.status(400).json('Login invalid');
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
