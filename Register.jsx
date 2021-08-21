import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API_URL } from '../../constant/API';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

const Register = (props) => {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const [registerUser, setRegisterUser] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  // get each input name value and state it in registerUser
  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setRegisterUser({ ...registerUser, [name]: value });
  };

  // register user
  const registerUserBtn = () => {
    // checking if user has already registered
    Axios.get(`${API_URL}/users`, {
      params: {
        username: registerUser.username,
      },
    })
      // if username has not been registered
      .then((res) => {
        if (!res.data.length) {
          delete res.data.password;
          Axios.post(`${API_URL}/users`, {
            fullName: registerUser.fullName,
            username: registerUser.username,
            email: registerUser.email,
            password: registerUser.password,
            role: 'user',
          })
            .then((result) => {
              alert(
                `Your account has successfully been registered!\nWelcome to E-T!`
              );
              dispatch({
                type: 'USER_LOGIN',
                payload: result.data,
              });
            })
            .catch(() => {
              alert(`Sorry, there's a problem on our site`);
            });
          // if username has been usedz
        } else {
          alert(`Username ${registerUser.username} has already been used.`);
        }
      })
      .catch(() => {
        alert(`Sorry, there's a problem on our site`);
      });
  };

  if (userGlobal.id) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <img
        src="/images/9.png"
        alt="Opalesque"
        style={{ position: 'absolute' }}
      />
      <div className="row">
        <div
          className="col-12 text-center"
          style={{ marginTop: '10rem', color: 'white' }}
        >
          <h1 style={{ fontSize: '45px' }}>
            <strong>Register Now!</strong>
          </h1>
          <p className="lead" style={{ fontSize: '30px' }}>
            <strong>Parking, feel easier.</strong>
          </p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-4 offset-4">
          <div className="card">
            <div className="card-body">
              <h5 className="font-weight-bold mb-3">Register</h5>
              <input
                name="fullName"
                onChange={inputHandler}
                placeholder="Full Name"
                type="text"
                className="form-control my-2"
              />
              <input
                name="username"
                onChange={inputHandler}
                placeholder="Username"
                type="text"
                className="form-control my-2"
              />
              <input
                name="email"
                onChange={inputHandler}
                placeholder="Email"
                type="text"
                className="form-control my-2"
              />
              <input
                name="password"
                onChange={inputHandler}
                placeholder="Password"
                type="password"
                className="form-control my-2"
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <button
                  onClick={registerUserBtn}
                  className="btn btn-outline-success mt-2"
                >
                  Register
                </button>
                <p
                  style={{
                    paddingTop: '17px',
                    marginLeft: '100px',
                    fontSize: '13px',
                  }}
                >
                  Already have an account?
                </p>
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', fontSize: '13px' }}
                >
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
