'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BoardGameSchema = new Schema({
    name: {
        type: String,
        required: "Enter name for the boardgame."
    },
    expansions: {
        type: [{
            type:string
        }]
    },
    plays: {
        type: [
            {
                Date: {
                    type: Date,
                    default: Date.now,
                },
                players: [{
                    type: string
                }],
                winner: {
                    type: string
                }
            }
        ]
    }
});
module.exports = mongoose.model('BoardGames', BoardGameSchema);