const jwt = require('jsonwebtoken');
const config = require('../../Config/config.js');

exports.verifyJWTToken = function(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token){
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        jwt.verify(token, config.secret,(err,decoded) => {
            if(err){
                return res.status(401).send();
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send();
    }
}

exports.verifyJWTTokenNotReadOnly= function(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token){
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        jwt.verify(token, config.secret,(err,decoded) => {
            if(err || decoded.readOnly){
                return res.status(401).send();
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send();
    }
}