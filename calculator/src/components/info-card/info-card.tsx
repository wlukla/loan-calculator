import React from 'react';
import PropTypes from 'prop-types';
import './info-card.css';

const InfoCard = (props) => {
  const { monthlyPayment, taxes, autoData } = props;
  const {
    msrp, vehicleName, dealerName, dealerPhoneNumber, dealerRating,
  } = autoData;

  return (
    <>
      <div className="item">
        <span className="label payment-label">Monthly Payment: </span>
        <span className="value payment">{`$ ${monthlyPayment}`}</span>
      </div>
      <div className="item">
        <span className="label">Taxes: </span>
        <span className="value">{taxes}</span>
      </div>
      <div className="item">
        <span className="label">Car model: </span>
        <span className="value">{vehicleName}</span>
      </div>
      <div className="item">
        <span className="label">MSPR: </span>
        <span className="value">{`$ ${msrp}`}</span>
      </div>
      <h4>Dealer Info</h4>
      <div className="item">
        <span className="label">Dealer: </span>
        <span className="value">{dealerName}</span>
      </div>
      <div className="item">
        <span className="label">Dealer phone: </span>
        <span className="value">{dealerPhoneNumber}</span>
      </div>
      <div className="item">
        <span className="label">Dealer rating: </span>
        <span className="value">{`${dealerRating}/5`}</span>
      </div>
    </>
  );
};

export default InfoCard;
