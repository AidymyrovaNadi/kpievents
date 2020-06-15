'use strict';

const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();
const getToday = require('./getEvents');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const id = {
  kpievents: 1331207388,
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
  bot.sendMessage(id.catskin, text);
};

const sendTodayEvents = () => {

  const receiver = id.catskin;

  getToday()

    .then(data => {
      const message = parseEvents(data);
      console.log(message);

      bot.sendMessage(receiver, message, { parse_mode: 'Markdown' });

      const hourToSend = 16;

      const timeToRepeat = new Date();
      // проверка if-else на 0-23
      if (timeToRepeat.getHours() <= hourToSend) {
        timeToRepeat.setHours(hourToSend, 35);
      } else {
        timeToRepeat.setHours(hourToSend, 35);
        timeToRepeat.setDate(timeToRepeat.getDate() + 1);
      }

      console.log(timeToRepeat);

      const delay = timeToRepeat.getTime() - new Date().getTime();
      console.log(delay);
      // const delay = 1000;
      sendMe(timeToRepeat);

      console.log(delay);

      setTimeout(() => {
        sendTodayEvents();

        setInterval(() => { sendTodayEvents(); }, 60000);
      }, delay);
      //setTimeout с delay, setInterval - 24h

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

  sendTodayEvents();
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



  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'kekeke');
});

