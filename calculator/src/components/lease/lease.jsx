import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Select from '../select';

const Lease = (props) => {
  const {
    zip, tradeInValue, downPayment, creditScore, term, mileages,
    onZipChange, onMileagesChange, onTradeInChange, onTermChange,
    onDownPaymentChange, onCreditScoreChange, creditScoreOptions, termOptions,
    mileagesOptions,
  } = props;

  return (
    <form className="border border-primary rounded w-50 mt-5 p-5 mr-5">
      <Input
        label="Home zip code"
        value={zip}
        onChange={onZipChange}
      />
      <Select
        label="Mileages"
        value={mileages}
        onChange={onMileagesChange}
        optionsArr={mileagesOptions}
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
  mileages: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  onZipChange: PropTypes.func.isRequired,
  onMileagesChange: PropTypes.func.isRequired,
  onTradeInChange: PropTypes.func.isRequired,
  onTermChange: PropTypes.func.isRequired,
  onDownPaymentChange: PropTypes.func.isRequired,
  onCreditScoreChange: PropTypes.func.isRequired,
  creditScoreOptions: PropTypes.instanceOf(Array).isRequired,
  termOptions: PropTypes.instanceOf(Array).isRequired,
  mileagesOptions: PropTypes.instanceOf(Array).isRequired,
};

export default Lease;
