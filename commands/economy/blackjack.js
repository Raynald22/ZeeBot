const { MessageEmbed } = require('discord.js');
const config = require('../../config.js')
const db = require("quick.db");
const func = require('../../functions/func.js')
const _ = require("lodash");
cards = {
    1: "Ace",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Jack",
    12: "Queen",
    13: "King",
};

deck = {
    Diamonds: {cards},
    Hearts: {cards},
    Spades: {cards},
    Clubs: {cards}
};

function drawCard() {
    icons = ['♥️','♠️','♦️','♣️']
    suite = _.random(0,3);
    card = _.random(0,12);
    return ['cardDeck'][suite][card] , icons[suite];
}

module.exports = {
    name: 'blackjack',
    category: 'economy',
    aliases: ['bj'],
    description: 'Mengjudi.',
    usage: `blackjack`,
    yangbisapakai: 'Semua pengguna',
    run: async (client, message, args) => {

    var playerHand = 0, dealerHand = 0;
    var playerHandCards = [],dealerHandCards = [];

    message.lineReply("Dealing...")
    .then(msg => {
        for(i = 0; i < 2; i++) {
            temp = drawCard();
            playerHandCards.push(temp);
            playerHand += temp[0];
        }

        console.log(playerHandCards);

        msg.edit(`${drawCard()}`);
        message.react(command_success);
    })
    .catch(error => {
        message.lineReply(`Ada yang error\n[${error}]`);
        message.react(':x:');
    });

}}

