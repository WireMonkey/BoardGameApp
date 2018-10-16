'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BoardGameSchema = new Schema({
    name: {
        type: String,
        required: "Enter name for the boardgame."
    },
    expansions: {
        type: [String]
    },
    plays: {
        type: [
            {
                Date: {
                    type: Date,
                    default: Date.now,
                },
                players: [{
                    type: String
                }],
                winner: {
                    type: String
                }
            }
        ]
    }
});
module.exports = mongoose.model('BoardGames', BoardGameSchema);