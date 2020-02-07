import React from 'react';
import PropTypes from 'prop-types';

class InfoCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { monthlyPayment, taxes } = this.props;
    return (
      <div className="border border-secondary rounded w-50 mt-5 p-5 ml-5 d-flex flex-column">
        {/* <span>
          {`MSPR: ${msrp}`}
        </span> */}
        <span>
          {`monthlyPayment: ${monthlyPayment}`}
        </span>
        <span>
          {`taxes ${taxes}`}
        </span>
      </div>
    );
  }
}

InfoCard.propTypes = {
  // msrp: PropTypes.number.isRequired,
  monthlyPayment: PropTypes.string.isRequired,
  taxes: PropTypes.instanceOf(Array).isRequired,
};

export default InfoCard;
