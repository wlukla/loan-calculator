import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Select from '../select';
import Spinner from '../spinner';

const Loan = (props) => {
  const {
    zip, tradeInValue, downPayment, creditScore, term, apr, isTradeInError,
    onZipChange, onAprChange, onTradeInChange, onTermChange, isDownPaymentError,
    onDownPaymentChange, onCreditScoreChange, isLoadingZip,
  } = props;

  if (isLoadingZip) {
    return (
      <Spinner />
    );
  }

  return (
    <form className="border border-primary rounded p-4">
      <Input
        mask="99999"
        label="Home zip code"
        value={zip}
        onChange={onZipChange}
      />
      <Input
        mask="% 9.9"
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
      >
        {[12, 24, 36, 48, 60, 72]}
      </Select>
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
      >
        {[600, 650, 700, 750, 800, 850, 900]}
      </Select>
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
  isTradeInError: PropTypes.bool.isRequired,
  isDownPaymentError: PropTypes.bool.isRequired,
  isLoadingZip: PropTypes.bool.isRequired,
};

export default Loan;
