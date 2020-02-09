import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Select from '../select';

const Loan = (props) => {
  const {
    zip, tradeInValue, downPayment, creditScore, term, apr, isTradeInError,
    onZipChange, onAprChange, onTradeInChange, onTermChange, isDownPaymentError,
    onDownPaymentChange, onCreditScoreChange, creditScoreOptions, termOptions,
  } = props;

  return (
    <form className="border border-primary rounded p-5">
      <Input
        mask="99999"
        label="Home zip code"
        value={zip}
        onChange={onZipChange}
      />
      <Input
        mask="% 99.99"
        label="APR"
        value={apr}
        onChange={onAprChange}
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

Loan.propTypes = {
  zip: PropTypes.string.isRequired,
  tradeInValue: PropTypes.string.isRequired,
  downPayment: PropTypes.string.isRequired,
  creditScore: PropTypes.string.isRequired,
  apr: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  onZipChange: PropTypes.func.isRequired,
  onAprChange: PropTypes.func.isRequired,
  onTradeInChange: PropTypes.func.isRequired,
  onTermChange: PropTypes.func.isRequired,
  onDownPaymentChange: PropTypes.func.isRequired,
  onCreditScoreChange: PropTypes.func.isRequired,
  creditScoreOptions: PropTypes.instanceOf(Array).isRequired,
  termOptions: PropTypes.instanceOf(Array).isRequired,
  isTradeInError: PropTypes.bool.isRequired,
  isDownPaymentError: PropTypes.bool.isRequired,
};

export default Loan;
