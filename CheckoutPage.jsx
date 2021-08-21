import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../constant/API';
import '../App.css';

const TicketPage = () => {
  const userGlobal = useSelector((state) => state.user);
  const ticketGlobal = useSelector((state) => state.ticket);
  const dispatch = useDispatch();

  const [checkoutHour, setCheckoutHour] = useState(0);
  const [totalHour, setTotalHour] = useState(0);
  const [userPayment, setUserPayment] = useState(0);

  const paymentGenerator = (hour) => {
    let fee = 5000;
    if (hour > 2) {
      fee += (hour - 2) * 7000;
      //   if 24hours++
      if (fee > 75000) {
        fee = 75000;
      } else if (hour <= 2) {
        fee = 5000;
      }
      //   set state totalhour = fee
    }
    setTotalHour(fee);
  };

  //   time function
  const timeFunctions = () => {
    let time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const date = time.getDate();
    const months = time.getMonth();
    const years = time.getFullYear();
    return {
      hours,
      minutes,
      seconds,
      date,
      months,
      years,
    };
  };

  let { hours, minutes, seconds, date, months, years } = timeFunctions();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // function to execute user payment
  const payButtonHandler = () => {
    // conditions
    if (userPayment < totalHour) {
      alert(`uhoh! uang anda kurang Rp.${totalHour - userPayment}`);
      return;
    }

    if (userPayment > totalHour) {
      alert(
        `Thank you for your order!\nHere is your change: Rp.${
          userPayment - totalHour
        }`
      );
    }
    // if userPayment > totalHour
    // patch the spot back to empty string
    Axios.patch(`${API_URL}/ticket/${ticketGlobal.id}`, {
      ticketNumber: '',
      date: '',
      time: '',
      userId: 0,
      isOccupied: false,
    })
      .then((result) => {
        dispatch({
          type: 'USER_CHECKOUT',
        });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });

    // then post to db.transactions to record each transactions
    const d = new Date();
    Axios.post(`${API_URL}/transactions`, {
      userId: userGlobal.id,
      CarSpot: ticketGlobal.id,
      ticketNumber: ticketGlobal.ticketNumber,
      totalPayment: parseInt(totalHour),
      transactionDate: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
    })
      .then((result) => {
        alert(`Your payment has successfully been received, Thank You!`);
        dispatch({
          type: 'USER_CHECKOUT',
        });
      })
      .catch(() => {
        alert(`Terjadi kesalahan di server`);
      });
  };

  return (
    <div className="hero-container my-3 d-flex justify-content-center ">
      {userGlobal.id ? (
        <>
          <div
            className="container my-4 card checkout_page text-secondary"
            style={{ height: '50vh' }}
          >
            <div className="container my-3 d-flex justify-content-center">
              <h2>HOLYWINGS E-PARKING</h2>
            </div>
            <div className="container d-flex justify-content-center">
              <h5>Parking Ticket</h5>
            </div>
            <br />
            <div className="d-flex justify-content-center">
              -----------------------------------------
            </div>
            <div className="card-body mx-3">
              <p>
                <strong>Name:</strong> {userGlobal.fullName}
              </p>
              <p>
                <strong>Ticket Number:</strong> {ticketGlobal.ticketNumber}
              </p>
              <p>
                <strong>Parking Spot:</strong> {ticketGlobal.id}
              </p>
              <p>
                <strong>Date In:</strong> {ticketGlobal.date}
              </p>
              <p>
                <strong>Time In:</strong> {ticketGlobal.time}
              </p>
              <hr />
              <div>
                <p>
                  <strong>Time Now: </strong> {hours}:{minutes}:{seconds}
                </p>
                <p>
                  <strong>Date Now: </strong> {date}-{months}-{years}
                  {}
                </p>
                <label style={{ marginRight: '10px' }}>
                  <strong>Total Parking Hour:</strong>
                </label>
                <input
                  type="text"
                  onChange={(e) => setCheckoutHour(e.target.value)}
                />
                <div
                  className="d-flex justify-content-center"
                  style={{ marginTop: '8vh' }}
                >
                  <button
                    type="button"
                    className="btn btn-danger btn-lg btn-block"
                    onClick={() => paymentGenerator(checkoutHour)}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            {totalHour !== 0 ? (
              <div className="card align-content-center mx-4 my-4 border border-warning">
                <div className="card-body">
                  <p>
                    <strong>
                      Hello, {userGlobal.fullName}! Your total parking fee is:
                    </strong>
                  </p>
                  <h4 className="text-center border border-warning my-4 text-dark">
                    Rp.{totalHour}
                  </h4>
                  <p>Input your money here:</p>
                  <input
                    onChange={(e) => setUserPayment(e.target.value)}
                    type="number"
                    placeholder="Rp."
                  />
                  <div className="d-flex flex-row-reverse">
                    <button
                      onClick={payButtonHandler}
                      className="btn btn-success"
                    >
                      Pay Here
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TicketPage;
