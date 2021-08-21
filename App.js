import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import Axios from 'axios';
// import { API_URL } from './constant/API';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import RevenuePage from './pages/RevenuePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Booking from './pages/Booking';
import ParkingSlot from './components/ParkingSlot';
import CheckoutPage from './pages/CheckoutPage';

document.body.style = 'background: #DDDDDD;';

const App = (props) => {
  // const ticketGlobal = useSelector((state) => state.ticket);
  // const userGlobal = useSelector((state) => state.user);

  // const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route component={RevenuePage} path="/revenuepage" />
        <Route component={Register} path="/register" />
        <Route component={Login} path="/login" />
        <Route component={Booking} path="/bookingpage" />
        <Route component={ParkingSlot} path="/parkingslot" />
        <Route component={CheckoutPage} path="/checkoutpage" />
        <Route component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
