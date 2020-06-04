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

const parseEvents = data => {
  let message = '*Мероприятия на сегодня:*\n\n';
  data.forEach(element => {
    const date = new Date(element.datetime);
    const day = date.getDate().toString();
    const month = date.getMonth().toString();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    // eslint-disable-next-line max-len
    const eventDate = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}, ${day.padStart(2, '0')}.${month.padStart(2, '0')}`;
    // eslint-disable-next-line max-len
    message += `_${element.title}_\nО мероприятии: ${element.description}\nВремя: ${eventDate}\nМесто: ${element.place}\n\n`;
  });

  return message;
};

bot.onText(/\/echo/, msg => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  //
  getToday('http://localhost:8000/api/events&startdate=2020-08-30T00:00:00Z&enddate=2020-06-06T00:00:00Z')
    .then(data => {
      const message = parseEvents(data);
      console.log(message);
      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    });

});

bot.onText(/\/today/, msg => {

  const chatId = msg.chat.id;



  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'kekeke');
});
