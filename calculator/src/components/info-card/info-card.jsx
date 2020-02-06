import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = (props) => {
  const { msrp, monthlyPayment, taxes } = props;
  return (
    <div className="border border-secondary rounded w-50 mt-5 p-5 ml-5 d-flex flex-column">
      <span>
        {`MSPR: ${msrp}`}
      </span>
      <span>
        {`monthlyPayment: ${monthlyPayment}`}
      </span>
      <span>
        {`taxes ${taxes}`}
      </span>
    </div>
  );
};

InfoCard.propTypes = {
  msrp: PropTypes.string.isRequired,
  monthlyPayment: PropTypes.string.isRequired,
  taxes: PropTypes.string.isRequired,
};

export default InfoCard;
