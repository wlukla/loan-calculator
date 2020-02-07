import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Select from '../select';

const Lease = (props) => {
  const {
    zip, tradeInValue, downPayment, creditScore, term, mileage,
    onZipChange, onMileageChange, onTradeInChange, onTermChange,
    onDownPaymentChange, onCreditScoreChange, creditScoreOptions, termOptions,
    mileageOptions,
  } = props;

  return (
    <form className="border border-primary rounded p-5">
      <Input
        label="Home zip code"
        value={zip}
        onChange={onZipChange}
      />
      <Select
        label="Mileages"
        value={mileage}
        onChange={onMileageChange}
        optionsArr={mileageOptions}
      />
      <Input
        label="Trade-in value"
        value={tradeInValue}
        onChange={onTradeInChange}
      />
      <Select
        label="Term in month"
        value={term}
        onChange={onTermChange}
        optionsArr={termOptions}
      />
      <Input
        label="Down payment"
        value={downPayment}
        onChange={onDownPaymentChange}
      />
      <Select
        label="Credit Score"
        value={creditScore}
        onChange={onCreditScoreChange}
        optionsArr={creditScoreOptions}
      />
    </form>
  );
};

Lease.propTypes = {
  zip: PropTypes.string.isRequired,
  tradeInValue: PropTypes.string.isRequired,
  downPayment: PropTypes.string.isRequired,
  creditScore: PropTypes.string.isRequired,
  mileage: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  onZipChange: PropTypes.func.isRequired,
  onMileageChange: PropTypes.func.isRequired,
  onTradeInChange: PropTypes.func.isRequired,
  onTermChange: PropTypes.func.isRequired,
  onDownPaymentChange: PropTypes.func.isRequired,
  onCreditScoreChange: PropTypes.func.isRequired,
  creditScoreOptions: PropTypes.instanceOf(Array).isRequired,
  termOptions: PropTypes.instanceOf(Array).isRequired,
  mileageOptions: PropTypes.instanceOf(Array).isRequired,
};

export default Lease;
