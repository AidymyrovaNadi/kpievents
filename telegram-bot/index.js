'use strict';

const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();
const getToday = require('./getEvents');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const id = {
  kpievents: '@truekpievents',
  catskin:  177498086,
  yourhope: 376946651,
};

const parseEvents = data => {
  let message = '*Мероприятия на сегодня:*\n\n';
  data.forEach(element => {
    const date = new Date(element.datetime);
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    // eslint-disable-next-line max-len
    const eventDate = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}, ${day.padStart(2, '0')}.${month.padStart(2, '0')}`;
    // eslint-disable-next-line max-len
    message += `_${element.title}_\n*О мероприятии:* ${element.description}\n*Время:* ${eventDate}\n*Место:* ${element.place}\n\n`;
  });

  return message;
};

const sendMe = text => {
  bot.sendMessage(id.yourhope, text);
};

const sendTodayEvents = () => {
  
  const receiver = id.kpievents;

  getToday()
    .then(data => {
      const message = parseEvents(data);
      console.log(message);
      bot.sendMessage(receiver, message, { parse_mode: 'Markdown' });
    });
};

const setAdminCommand = (command, callback) => {
  const regexp = new RegExp('/' + command);
  bot.onText(regexp, (msg, match) => {
    if (msg.from.id === id.catskin || id.yourhope) {
      callback(msg, match);
    } else {
      bot.sendMessage(msg.chat.id, 'А?');
    }
  });
};

setAdminCommand('sendEvents', () => {

  const HOUR_TO_SEND = 12;
  const MSEC_INTERVAL = 24 * 60 * 60 * 1000;

  const timeToSend = new Date();

  if (timeToSend.getHours() < HOUR_TO_SEND) {
    timeToSend.setHours(HOUR_TO_SEND, 0, 0);
  } else {
    timeToSend.setHours(HOUR_TO_SEND, 0, 0);
    timeToSend.setDate(timeToSend.getDate() + 1);
  }

  const timeLeftToSend = timeToSend.getTime() - new Date().getTime();
  sendMe(timeToSend);

  console.log(timeToSend);
  console.log(timeLeftToSend);

  setTimeout(() => {
    sendTodayEvents();
    setInterval(() => {
      sendTodayEvents();
    }, MSEC_INTERVAL);
  }, timeLeftToSend);

});


bot.onText(/\/echo/, msg => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  getToday()

    .then(data => {
      const message = parseEvents(data);
      console.log(message);
      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    });

});

bot.onText(/\/today/, msg => {

  const chatId = msg.chat.id;

  console.log(msg.chat.id);

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, msg.chat.id);
});

