import React from 'react';
import './index.css';
// import { Link } from 'react-router-dom';
import DayBlock from '../../components/DayBlock';
import useFetchEvents from '../../hooks/useFetchEvents';

function Main() {
  const inputArr = [
    [
      {
        id_event: 4,
        id_editor: 3,
        id_writer: 2,
        title: 'Quarantine AfterParty',
        description: 'Much more nice party',
        place: 'Poliana',
        datetime: '2020-06-15T13:00:00.000Z'
      },
      {
        id_event: 416,
        id_editor: 1,
        id_writer: 2,
        title: 'nulla',
        description: 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
        place: 'Novikovo',
        datetime: '2020-06-15T14:30:00.000Z'
      },
      {
        id_event: 361,
        id_editor: 1,
        id_writer: 2,
        title: 'blandit',
        description: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        place: 'Leninskiy',
        datetime: '2020-06-15T17:00:00.000Z'
      }
    ],
    [
      {
        id_event: 403,
        id_editor: 3,
        id_writer: 2,
        title: 'est',
        description: 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        place: 'Kanoya',
        datetime: '2020-06-16T05:10:00.000Z'
      },
      {
        id_event: 386,
        id_editor: 2,
        id_writer: 2,
        title: 'fusce posuere felis',
        description: 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        place: 'Luftinjë',
        datetime: '2020-06-16T07:45:00.000Z'
      },
      {
        id_event: 371,
        id_editor: 1,
        id_writer: 3,
        title: 'felis ut',
        description: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
        place: 'Ciseda',
        datetime: '2020-06-16T07:55:00.000Z'
      },
      {
        id_event: 383,
        id_editor: 1,
        id_writer: 2,
        title: 'est congue',
        description: 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
        place: 'Donskoy',
        datetime: '2020-06-16T08:00:00.000Z'
      },
      {
        id_event: 444,
        id_editor: 1,
        id_writer: 2,
        title: 'Защита проекта!!!',
        description: 'Лучше поспи',
        place: 'Discord',
        datetime: '2020-06-16T12:00:00.000Z'
      },
      {
        id_event: 424,
        id_editor: 1,
        id_writer: 1,
        title: 'duis aliquam',
        description: 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
        place: 'Aulnay-sous-Bois',
        datetime: '2020-06-16T15:30:00.000Z'
      },
      {
        id_event: 390,
        id_editor: 2,
        id_writer: 2,
        title: 'sit',
        description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        place: 'Kukichūō',
        datetime: '2020-06-16T16:00:00.000Z'
      },
      {
        id_event: 354,
        id_editor: 1,
        id_writer: 1,
        title: 'sapien quis',
        description: 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
        place: 'Dayong',
        datetime: '2020-06-16T18:30:00.000Z'
      }
    ],
    [
      {
        id_event: 360,
        id_editor: 2,
        id_writer: 3,
        title: 'a',
        description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        place: 'Örebro',
        datetime: '2020-06-17T07:00:00.000Z'
      },
      {
        id_event: 377,
        id_editor: 3,
        id_writer: 1,
        title: 'libero nam',
        description: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
        place: 'Sanchahe',
        datetime: '2020-06-17T08:30:00.000Z'
      },
      {
        id_event: 445,
        id_editor: 1,
        id_writer: 2,
        title: 'Празднование защиты проекта!!!',
        description: 'Отдохни наконец-то',
        place: 'Где угодно',
        datetime: '2020-06-17T15:00:00.000Z'
      },
      {
        id_event: 409,
        id_editor: 4,
        id_writer: 3,
        title: 'eleifend donec ut',
        description: 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        place: 'Ryazanskaya',
        datetime: '2020-06-17T15:30:00.000Z'
      }
    ],
    [
      {
        id_event: 399,
        id_editor: 2,
        id_writer: 2,
        title: 'orci',
        description: 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        place: 'Piterka',
        datetime: '2020-06-18T06:30:00.000Z'
      },
      {
        id_event: 388,
        id_editor: 1,
        id_writer: 3,
        title: 'sed',
        description: 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        place: 'Kuala Lumpur',
        datetime: '2020-06-18T09:00:00.000Z'
      },
      {
        id_event: 429,
        id_editor: 4,
        id_writer: 1,
        title: 'ornare consequat lectus',
        description: 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
        place: 'Gandara',
        datetime: '2020-06-18T19:15:00.000Z'
      }
    ],
    [
      {
        id_event: 408,
        id_editor: 4,
        id_writer: 1,
        title: 'nulla ac',
        description: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
        place: 'Maco',
        datetime: '2020-06-19T09:30:00.000Z'
      },
      {
        id_event: 433,
        id_editor: 3,
        id_writer: 2,
        title: 'pede posuere nonummy integer',
        description: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        place: 'Donostia-San Sebastian',
        datetime: '2020-06-19T11:30:00.000Z'
      },
      {
        id_event: 412,
        id_editor: 1,
        id_writer: 2,
        title: 'integer a nibh in',
        description: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
        place: 'Abomey',
        datetime: '2020-06-19T12:00:00.000Z'
      },
      {
        id_event: 411,
        id_editor: 1,
        id_writer: 1,
        title: 'sit amet sem fusce consequat',
        description: 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
        place: 'Uyen Hung',
        datetime: '2020-06-19T13:05:00.000Z'
      },
      {
        id_event: 432,
        id_editor: 1,
        id_writer: 1,
        title: 'sem sed sagittis nam congue',
        description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        place: 'Cinunjang',
        datetime: '2020-06-19T15:45:00.000Z'
      }
    ],
    [
      {
        id_event: 4,
        id_editor: 3,
        id_writer: 2,
        title: 'Quarantine AfterParty',
        description: 'Much more nice party',
        place: 'Poliana',
        datetime: '2020-06-20T13:00:00.000Z'
      },
      {
        id_event: 416,
        id_editor: 1,
        id_writer: 2,
        title: 'nulla',
        description: 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
        place: 'Novikovo',
        datetime: '2020-06-20T14:30:00.000Z'
      },
      {
        id_event: 361,
        id_editor: 1,
        id_writer: 2,
        title: 'blandit',
        description: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        place: 'Leninskiy',
        datetime: '2020-06-20T17:00:00.000Z'
      }
    ],
    [
      {
        id_event: 373,
        id_editor: 4,
        id_writer: 1,
        title: 'morbi vestibulum',
        description: 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        place: 'Chum Phae',
        datetime: '2020-06-21T17:15:00.000Z'
      }
    ]
  ];

  let firstColumn = [];
  let secondColumn = [];
  let thirdColumn = [];

  inputArr.forEach(elem => {

    elem.forEach(object => {

      if ( ((inputArr.indexOf(elem)) % 3) === 0) {
        firstColumn.push(object);
      } else if ( ((inputArr.indexOf(elem)) % 3) === 1) {
        secondColumn.push(object);
      } else if ( ((inputArr.indexOf(elem)) % 3) === 2) {
        thirdColumn.push(object);
      }

    });

  });

  const events = useFetchEvents()

  if (!events.response) {
    return <div>Loading...</div>;
  }

  const arr = events.response;

  return (
    <div className="main">
      <div className='column'>
        <DayBlock info={arr[0]}/>
        <DayBlock info={arr[3]}/>
      </div>
      <div className='column'>
        <DayBlock info={arr[1]}/>
        <DayBlock info={arr[4]}/>
        <DayBlock info={arr[6]}/>
      </div>
      <div className='column'>
        <DayBlock info={arr[2]}/>
        <DayBlock info={arr[5]}/>
      </div>
    </div>
  );
}

export default Main;
