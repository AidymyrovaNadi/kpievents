import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import DayBlock from '../../components/DayBlock';
import { StyledSelectDatepicker, DateContainer } from './styledDatePicker.js'

function Edit() {

  const [event, setEvent] = useState({
    datetime: new Date(),
    place: "Місце проведення",
    title: "Короткий заголовок",
    description: "Опис події",
  })

  const onChangeListener = (name, e) => {
    setEvent({...event, [name]: e.target.value})
  }

  const onDateChangeListener = date => {
    const time = event.datetime
    date.setHours(time.getHours())
    date.setMinutes(time.getMinutes())
    setEvent({...event, datetime: date})
  }

  const onTimeChangeListener = e => {
    const time = e.target
    if (time.value.length == 2) time.value += ":"
    if (time.value.length > 5) time.value = time.value.substring(0, 5)
  }

  const onTimeBlurListener = e => {
    const time = e.target.value.split(":")
    const current = event.datetime
    current.setHours(time[0])
    current.setMinutes(time[1])
    setEvent({...event, datetime: current })
  }

  return (
    <div className="main_edit">
      <div className="event-add">
        <p className="event-input__header">Додати подію</p>
        <DateContainer>
          <StyledSelectDatepicker
            value={ event.datetime }
            onDateChange={ onDateChangeListener }
            showLabels={ false }
            showErrors={ false }
            format="day/month/year"
          />
        </DateContainer>
        <input type="text" placeholder="Час" className="event-input_default event-input_time" onChange={ onTimeChangeListener } onBlur={ onTimeBlurListener }/>
        <input type="text" placeholder="Короткий заголовок" className="event-input_default event-input_name" onChange={ onChangeListener.bind({}, "title") }/>
        <textarea placeholder="Опис події" className="event-input_default event-input_description" onChange={ onChangeListener.bind({}, "description") }/>
        <input type="text" placeholder="Місце проведення" className="event-input_default event-input_place" onChange={ onChangeListener.bind({}, "place") }/>

        <button className="event-input__confirm">Зберегти</button>

        <p className="event-input__additional-info">Хочемо зазначити, що редагувати подію, після збережнння, не можливо. Для видалення події повідомте нас <b><a href="mailto:sashkaborshosh@gmail.com?subject=Видалення події.">events</a></b>.</p>
      </div>

      <div className="event-preview">
        <DayBlock info={[event]}/>
        <p className="event-input__additional-info">Щоб розгорнути подію <b style={{ color: "var(--orange)"} }>натисніть</b> на неї.</p>
      </div>
    </div>
  );
}

export default Edit;
