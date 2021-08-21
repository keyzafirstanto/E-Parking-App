import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../constant/API';

const TicketPage = () => {
  const userGlobal = useSelector((state) => state.user);

  const [dataTransactions, setDataTransactions] = useState({
    transactions: [],
  });

  const fetchTransactions = () => {
    Axios.get(`${API_URL}/transactions`)
      .then((res) => {
        setDataTransactions({ ...dataTransactions, transactions: res.data });
      })
      .catch((err) => alert(err));
  };

  const renderTransactions = () => {
    return dataTransactions.transactions.map((val) => {
      return (
        <tr>
          <th scope="row">{val.id}</th>
          <td>{val.ticketNumber}</td>
          <td>{val.CarSpot}</td>
          <td>{val.transactionDate}</td>
          <td>{val.userId}</td>
          <td>Rp. {val.totalPayment}</td>
        </tr>
      );
    });
  };

  const totalProfit = () => {
    let total = 0;
    for (let i = 0; i < dataTransactions.transactions.length; i++) {
      total += dataTransactions.transactions[i].totalPayment;
    }
    return total.toLocaleString();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      {userGlobal.id ? (
        <>
          <div className="align-items-center">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Ticket Number</th>
                  <th scope="col">Parking Spot</th>
                  <th scope="col">Date</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Payment</th>
                </tr>
              </thead>
              <tbody>{renderTransactions()}</tbody>
            </table>
            <div className="border border-secondary d-flex flex-row justify-content-end mx-2">
              <span>
                <strong className=" mx-2">Total Profit:</strong>
              </span>
              Rp. {totalProfit()}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TicketPage;
