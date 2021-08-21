import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../constant/API';
import '../../App.css';

import { useSelector, useDispatch } from 'react-redux';

const Login = (props) => {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);

  const [loginUser, setLoginUser] = useState({
    username: '',
    password: '',
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setLoginUser({ ...loginUser, [name]: value });
  };

  const loginBtnHandler = () => {
    // checking if username has already been stored/registered
    Axios.get(`${API_URL}/users`, {
      params: {
        username: loginUser.username,
      },
    })
      // if yes
      .then((result) => {
        if (result.data.length) {
          if (loginUser.password === result.data[0].password) {
            delete result.data[0].password;
            localStorage.setItem('userMatch', JSON.stringify(result.data[0]));
            dispatch({
              type: 'USER_LOGIN',
              payload: result.data[0],
            });
            // if password is wrong
          } else {
            dispatch({
              type: 'USER_ERROR',
              payload: 'Wrong password',
            });
          }
          // if user not found
        } else {
          dispatch({
            type: 'USER_ERROR',
            payload: 'User not found',
          });
        }
      })
      .catch((err) => {
        alert(`Terjadi kesalahan di server`);
      });
  };

  if (userGlobal.id) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <img src="/images/9.png" alt="9" />
      <div className="row">
        <div
          style={{ marginTop: '10rem', color: 'white' }}
          className="col-12 text-center"
        >
          <h1 className="lead">
            <strong>Welcome back!{userGlobal.username}</strong>
          </h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-4 offset-4">
          {userGlobal.errMsg ? (
            <div className="alert alert-danger">{userGlobal.errMsg}</div>
          ) : null}
          <div className="card">
            <div className="card-body">
              <h5 className="font-weight-bold mb-3">Log in</h5>
              <input
                onChange={inputHandler}
                name="username"
                placeholder="Username"
                type="text"
                className="form-control my-2"
              />
              <input
                onChange={inputHandler}
                name="password"
                placeholder="Password"
                type="password"
                className="form-control my-2"
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <button
                  onClick={loginBtnHandler}
                  className="btn btn-outline-primary mt-1"
                  style={{ paddingBottom: '7px' }}
                >
                  Login
                </button>
                <p
                  style={{
                    paddingTop: '17px',
                    marginLeft: '110px',
                    fontSize: '13px',
                  }}
                >
                  Haven't got an account?
                </p>
                <Link
                  to="/register"
                  style={{ textDecoration: 'none', fontSize: '13px' }}
                >
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
