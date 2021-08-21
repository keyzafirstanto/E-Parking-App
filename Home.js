import React, { useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../constant/API';

const UserTicket = () => {
  const userGlobal = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <div className="d-flex justify-content-center home-page">
      {userGlobal.id ? (
        <>
          <div>
            <img src="/images/9.png" alt="tree" className="tree_1" />
            <h4
              className="h4_home"
              style={{ color: 'white', fontSize: '45px', marginTop: '20rem' }}
            >
              <strong>Welcome, {userGlobal.fullName}!</strong>
            </h4>
            <div className="my-4 ">
              <div className="align-items-center click-container my-3">
                <button className="btn btn-primary btn-lg">
                  <Link
                    to="/parkingSlot"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    View Available Spot
                  </Link>
                </button>
              </div>
              <div className="my-3">
                <button className="btn btn-success btn-lg">
                  <Link
                    to="/bookingpage"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Book a Ticket
                  </Link>
                </button>
              </div>
              {userGlobal.role === 'admin' ? (
                <div className="my-3">
                  <button className="btn btn-info btn-lg">
                    <Link
                      to="/revenuepage"
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      Transactions List
                    </Link>
                  </button>
                </div>
              ) : null}

              <div style={{ borderBottom: '1px solid grey' }}></div>
              <div className="my-3">
                <button className="btn btn-danger btn-lg">
                  <Link
                    to="/checkoutpage"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Checkout
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hero-section">
            <img src="/images/8.png" alt="tree" />
            <h1>
              <strong>Join to get your E-Ticket!</strong>
            </h1>
            <div className="row mt-4">
              <div className="align-items-center">
                <button className="btn btn-outline-success btn-lg">
                  <Link
                    to="/register"
                    className="register-user-button"
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      fontSize: '30px',
                    }}
                  >
                    Register
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTicket;
