import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import DayBlock from '../../components/DayBlock';



function Edit(props) {
  return (
    <div className="main_edit">
      <div className="event-add">
        <p className="event-input__header">Додати подію</p>
        <div className="event-input__when">
            <input type="text" className="event-input_default event-input_date"/>
            <input type="text" className="event-input_default event-input_month"/>
            <input type="text" className="event-input_default event-input_time"/>
        </div>
        <input type="text" placeholder="Короткий заголовок" className="event-input_default event-input_name"/>
        <textarea type="text" placeholder="Опис події" className="event-input_default event-input_description" />
        <input type="text" placeholder="Місце проведення" className="event-input_default event-input_place"/>
        <input type="text" placeholder="Власник" className="event-input_default event-input_type"/>

        <button className="event-input__confirm">Зберегти</button>

        <p className="event-input__additional-info">Хочемо зазначити, що редагувати подію, після збережнння, не можливо. Для видалення події повідомте нас <a href="mailto:sashkaborshosh@gmail.com?subject=Видалення події.">events</a>.</p>
      </div>
      
      <div className="event-preview">
        <DayBlock info={ props[0] }/>
        <p className="event-input__additional-info" style={{textAlign: "center"}}>Щоб розгорнути подію <b>натисніть</b> на неї.</p>
      </div>
    </div>
  );
}

export default Edit;
