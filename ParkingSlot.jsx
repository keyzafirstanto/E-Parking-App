import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../constant/API';
import { Link } from 'react-router-dom';

const ParkingSlot = () => {
  const userGlobal = useSelector((state) => state.user);

  const [fetchUserSlot, setFetchUserSlot] = useState({
    ticketData: [],
  });

  const fetchTicketSlot = () => {
    Axios.get(`${API_URL}/ticket`)
      .then((res) => {
        setFetchUserSlot({ ticketData: res.data });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const renderParkSlot = () => {
    return fetchUserSlot.ticketData.map((val) => {
      if (val.isOccupied === true) {
        return (
          <button
            disabled={val.isOccupied}
            className="d-flex flex-row my-2 btn btn-outline-danger"
          >
            Occupied
          </button>
        );
      } else if (val.isOccupied !== true) {
        return (
          <button className="d-flex flex-row justify-content-between my-2 btn btn-outline-info">
            Available
          </button>
        );
      }
    });
  };

  useEffect(() => {
    fetchTicketSlot();
  }, []);

  return (
    <div>
      {userGlobal.id ? (
        <div className="container">
          <div className="row">
            <div className="col-4 offset-4">
              <div className="d-flex flex-row">
                <h5 className="font-weight-bold mb-3">
                  Available parking slot:
                </h5>
                <button
                  className="btn btn-outline-secondary"
                  onClick={fetchTicketSlot}
                >
                  🔄
                </button>
              </div>
              <div className="col-sm">{renderParkSlot()}</div>
              <p>*We Automatically direct you to the nearest parking spot</p>

              <div className="my-4">
                <p>Wanna book a parking slot?</p>
                <button className="btn btn-lg btn-info">
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to="/bookingpage"
                  >
                    Book Here
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ParkingSlot;
