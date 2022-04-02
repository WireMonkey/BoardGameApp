'use strict';
let fs = require('fs');
const bcrypt = require('bcrypt');
const Chance = require('chance');
const jwt = require('jsonwebtoken');
const config = require('../../Config/config.js');
const chance = new Chance();
const email = require('../libs/Email');
const saltRounds = 10;
let users = [];

try {
    fs.readFile('DB/Users.txt', function(err, data) { 
      if (err) {
        console.error(err);
      }
      users = JSON.parse(data.toString('utf8'));
      users.filter(x => x.resetHash).forEach(x => x.resetHash = '');
    });
  } catch (error) {
    console.error(error);
  }

exports.CreateUser = async function (req, res) {
    try {
        let hash = await HashPassword(req.body.userName, req.body.password);
        let userId = await SaveUser(req.body.userName, hash, req.body.email);

        fs.writeFile('DB/Users.txt', JSON.stringify(users), function (err) {
            if (err) {
              console.error(err);
              res.status(500).send(error);
            }
            res.json({message: 'Data Saved.'});
          });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
}

exports.ValidateUser = async function (req, res) {
    try {
        let user = users.find(x => x.userName === req.body.userName);
        if (user) {
            let correct = await CheckPassword(req.body.userName, req.body.password, user.password);
            if (correct) {
                let token = await GenerateJwt(user._id, false);
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

exports.ValidateReadOnlyUser = async function (req, res) {
    try {
        let user = users.find(x => x.userName === req.body.userName);
        let validId = req.body.id && req.body.id >= 1 && req.body.id <= 30001;
        if (user && validId) {
            let token = await GenerateJwt(user._id, true);
            res.json(token);
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
        let readOnly = req.decoded.readOnly
        let user = users.find(x => x._id === userId);
        if (user) {
            let token = await GenerateJwt(user._id, readOnly);
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
        let user = users.find(x => x.email === req.body.email);
        let resetHash = chance.hash({length: 50});
        if (user) {
            user.resetHash = resetHash;
            await email.SendEmail(user);
            res.status(200).send();
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

exports.updateUser = async function(req,res){
    try {
        let userId = req.decoded.userId;
        let user = users.find(x => x._id === userId);

        //Make sure that
        let nameEmailCheck = users.filter(x => x._id != userId && (x.userName == req.body.email || x.email == req.body.email));
        if(nameEmailCheck.length > 0) {
            throw error("Email or name already in use.");
        }
        
        if (req.body.password && req.body.password.length > 0) {
            user.password = await HashPassword(req.body.userName, req.body.password);
        }

        if (req.body.email) {
            user.email = req.body.email;
        }

        if (req.body.userName) {
            user.userName = req.body.userName;
        }

        fs.writeFile('DB/Users.txt', JSON.stringify(users), function (err) {
            if (err) {
              console.error(err);
              res.status(500).send(error);
            }
            res.json({message: 'Data Saved.'});
          });
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

async function SaveUser(userName, hashPassword, email) {
    let user = users.find(x => x.userName === userName || x.email == email);
    if (user) {
        throw Error('User already exists.');
    }

    let userId = chance.guid();
    users.push({ _id: userId, userName: userName, password: hashPassword, email: email });
    return userId;
}

async function GenerateJwt(userId, isReadOnly = false) {
    let token = jwt.sign({userId: userId, readOnly: isReadOnly},
        config.secret,
        { expiresIn: '24h' // expires in 24 hours
        }
      );

    return token;
}
