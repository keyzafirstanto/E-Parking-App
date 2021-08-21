import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../constant/API';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';

const BookingSection = () => {
  const userGlobal = useSelector((state) => state.user);
  const ticketGlobal = useSelector((state) => state.ticket);
  const dispatch = useDispatch();

  const [userTicket, setUserTicket] = useState({
    ticketNumber: '',
    date: '',
    time: '',
  });

  // e.target.value
  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserTicket({ ...userTicket, [name]: value });
  };

  const fetchDataUser = () => {
    Axios.get(`${API_URL}/ticket`, {
      params: {
        userId: userGlobal.id,
      },
    })
      .then((response) => {
        if (userGlobal.id === response.data[0].userId) {
          dispatch({
            type: 'GET_DATA',
            payload: response.data[0],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Function to generate combination of number + alphabets(sometimes) */
  const passwordGenerator = () => {
    if (userTicket.ticketNumber === '') {
      let randomNumber = Math.floor(Math.random() * 10000000).toString(21);
      setUserTicket({ ...userTicket, ticketNumber: randomNumber });
    } else {
      alert('Youve Already Got a Ticket');
    }
  };

  // automatically direct the user to the nearest available parking spot
  const parkingSpotBtnHandler = () => {
    Axios.get(`${API_URL}/ticket`, {
      params: {
        isOccupied: false,
      },
    })
      .then((res) => {
        if (res.data.length) {
          res.data.findIndex((val) => val.isOccupied === false);
          Axios.patch(`${API_URL}/ticket/${res.data[0].id}`, {
            ticketNumber: userTicket.ticketNumber,
            date: userTicket.date,
            time: userTicket.time,
            userId: userGlobal.id,
            isOccupied: true,
          })
            .then((res) => {
              alert(`We've successfully secured a parking spot for you.`);
            })
            .catch((err) => {
              alert(err);
            });
        }
      })
      .catch((err) => {
        alert(err);
      });
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

  if (date < 10) {
    date = `0${date}`;
  }
  if (months < 10) {
    months = `0${months}`;
  }

  // final time
  const timeStamp = `${hours}:${minutes}:${seconds}`;
  // final date
  const dateStamp = `${date}-${months}-${years}`;

  useEffect(() => {
    fetchDataUser();
  }, []);

  // automatically redirect user to checkoutpage if they already have a ticket
  if (ticketGlobal.ticketNumber !== '') {
    return <Redirect to="/checkoutpage" />;
  }

  return (
    <div>
      {userGlobal.id ? (
        <>
          <div className="container my-4 card checkout_page">
            <div className="card-body mx-4">
              <h4 style={{ marginBottom: '2rem' }}>Get your ticket here</h4>
              <div className="d-flex card-body flex-row justify-content-between align-items-center my-2">
                <h6 className="mx-4">Date: </h6>
                <input
                  name="date"
                  onChange={inputHandler}
                  placeholder={dateStamp}
                  type="text"
                  className="form-control-md"
                />
              </div>
              <div className="d-flex card-body flex-row justify-content-between align-items-center my-2">
                <h6 className="mx-4">Time:</h6>
                <input
                  name="time"
                  onChange={inputHandler}
                  placeholder={timeStamp}
                  type="text"
                  className="form-control-md"
                />
              </div>
              <hr />
              <div className="d-flex card-body flex-row justify-content-between align-items-center my-1"></div>
              <div className="card-body">
                <p>
                  <strong>Generate Your Ticket here</strong>
                </p>
                <button
                  onClick={passwordGenerator}
                  className="btn btn-success btn-md my-3"
                >
                  Book Ticket
                </button>
              </div>
              {userTicket.ticketNumber !== '' ? (
                <div className="card-body">
                  <p>
                    <strong>Date:</strong>
                    {userTicket.date}
                  </p>
                  <p>
                    <strong>Time:</strong>
                    {userTicket.time}
                  </p>
                  <p>
                    <strong>Ticker Number:</strong>
                  </p>
                  <p className="border border-primary text-center my-2 ml-4">
                    {userTicket.ticketNumber}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="d-flex card-body flex-row justify-content-between align-items-center">
              <p></p>
              <button
                onClick={parkingSpotBtnHandler}
                className="btn btn-primary btn-lg my-3 mx-3"
              >
                Book A Spot
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default BookingSection;
