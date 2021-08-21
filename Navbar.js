import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MiNavbar = () => {
  const userGlobal = useSelector((state) => state.user);
  const ticketGlobal = useSelector((state) => state.ticket);

  //   time function
  const timeFunctions = () => {
    let time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return {
      hours,
      minutes,
      seconds,
    };
  };

  let { hours, minutes, seconds } = timeFunctions();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // final time
  const timeStamp = `${hours}:${minutes}:${seconds}`;

  return (
    <div>
      <nav className="navbar justify-content-between navbar-dark bg-dark ">
        <Link to="/" className="navbar-brand mx-4">
          HW E-Parking
        </Link>
        <p className="text-white nav">{timeStamp}</p>
        {userGlobal.id ? (
          <>
            <p className="nav text-white">{userGlobal.fullName}</p>
            <p className="nav text-white">{ticketGlobal.ticketNumber}</p>
            <form className="form-inline">
              <button
                className="btn btn-outline-danger my-2 my-sm-0 mx-4"
                type="submit"
              >
                <Link
                  style={{ textDecoration: 'none', color: 'red' }}
                  to="checkoutpage"
                >
                  CHECKOUT
                </Link>
              </button>
            </form>
          </>
        ) : (
          <div style={{ marginRight: '20px' }}>
            <div>
              <button
                style={{ margin: '5px' }}
                className="btn btn-outline-primary"
              >
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Login
                </Link>
              </button>
              <button
                style={{ margin: '5px' }}
                className="btn btn-outline-success"
              >
                <Link
                  to="/register"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Register
                </Link>
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MiNavbar;
