import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import DayBlock from '../../components/DayBlock';
import { StyledSelectDatepicker, DateContainer } from './styledDatePicker.js'
import TimePicker from 'react-time-picker';

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
    setEvent({...event, datetime: date})
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
        <div className="event-input_default event-input_time">
          <TimePicker 
            disableClock={ true }
            clearIcon={ null }
          />
        </div>
        <input type="text" placeholder="Короткий заголовок" className="event-input_default event-input_name" onChange={ onChangeListener.bind({}, "title") }/>
        <textarea type="text" placeholder="Опис події" className="event-input_default event-input_description" onChange={ onChangeListener.bind({}, "description") }/>
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
