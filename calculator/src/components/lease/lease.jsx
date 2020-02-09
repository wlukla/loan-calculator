import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Select from '../select';

const Lease = (props) => {
  const {
    zip, tradeInValue, downPayment, creditScore, term, mileage,
    onZipChange, onMileageChange, onTradeInChange, onTermChange,
    onDownPaymentChange, onCreditScoreChange, creditScoreOptions, termOptions,
    mileageOptions, isTradeInError, isDownPaymentError,
  } = props;

  return (
    <form className="border border-primary rounded p-4">
      <Input
        mask="99999"
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
        mask="$ 9999999"
        label="Trade-in value"
        value={tradeInValue}
        onChange={onTradeInChange}
        error={isTradeInError}
      />
      <Select
        label="Term in month"
        value={term}
        onChange={onTermChange}
        optionsArr={termOptions}
      />
      <Input
        mask="$ 9999999"
        label="Down payment"
        value={downPayment}
        onChange={onDownPaymentChange}
        error={isDownPaymentError}
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
  isTradeInError: PropTypes.bool.isRequired,
  isDownPaymentError: PropTypes.bool.isRequired,
};

export default Lease;
