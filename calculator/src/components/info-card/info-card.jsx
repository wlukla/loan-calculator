import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = (props) => {
  const { monthlyPayment, taxes, autoData } = props;
  const {
    msrp, vehicleName, dealerName, dealerPhoneNumber, dealerRating,
  } = autoData;

  return (
    <div className="border border-secondary rounded w-50 mt-5 p-5 ml-5 d-flex flex-column">
      <span>
        {`Car model: ${vehicleName}`}
      </span>
      <span>
        {`MSPR: ${msrp}`}
      </span>
      <span>
        {`monthlyPayment: ${monthlyPayment}`}
      </span>
      <span>
        {`taxes ${taxes}`}
      </span>
      <span>
        {`Dealer: ${dealerName}`}
      </span>
      <span>
        {`Dealer phone: ${dealerPhoneNumber}`}
      </span>
      <span>
        {`Dealer rating: ${dealerRating}/5`}
      </span>
    </div>
  );
};

InfoCard.propTypes = {
  autoData: PropTypes.instanceOf(Object).isRequired,
  monthlyPayment: PropTypes.string.isRequired,
  taxes: PropTypes.instanceOf(Array).isRequired,
};

export default InfoCard;
