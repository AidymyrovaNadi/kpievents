'use strict';

const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();
const fetch = require('node-fetch');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const getToday = async (url = '') => {

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'no-cache',
    referrerPolicy: 'no-referrer',
    credentials: 'same-origin',

  });
  return await response.json();

};

bot.onText(/\/echo/, msg => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  getToday('http://localhost:8000/api/events&id=1')
    .then(data => {
      console.log(data);
      bot.sendMessage(chatId, JSON.stringify(data));
    });

});

bot.onText(/\/today/, msg => {

  const chatId = msg.chat.id;



  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'kekeke');
});
