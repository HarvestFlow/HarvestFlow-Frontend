import React from 'react';
import Countdown from 'react-countdown';

export default function NioCountDown() {
  const targetDate = new Date('2023-12-06T12:00:00');
  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <ul className="nk-countdown">
        <li>
          <div className="nk-countdown-content day">
            <span className="num m-0 h3 d-inline-block text-primary">{days}</span>
            <p className="word text-uppercase ">{days === 1 ? 'Day' : 'Days'}</p>
          </div>
        </li>
        <li>
          <div className="nk-countdown-content hour">
            <span className="num m-0 h3 d-inline-block text-primary">{hours}</span>
            <p className="word text-uppercase ">{hours === 1 ? 'Hour' : 'Hours'}</p>
          </div>
        </li>
        <li>
          <div className="nk-countdown-content min">
            <span className="num m-0 h3 d-inline-block text-primary">{minutes}</span>
            <p className="word text-uppercase ">{minutes === 1 ? 'Min' : 'Min'}</p>
          </div>
        </li>
        <li>
          <div className="nk-countdown-content sec">
            <span className="num m-0 h3 d-inline-block text-primary">{seconds}</span>
            <p className="word text-uppercase ">{seconds === 1 ? 'Sec' : 'Sec'}</p>
          </div>
        </li>
      </ul>
    )
  };

  return <Countdown date={targetDate} renderer={renderer} />;
}
