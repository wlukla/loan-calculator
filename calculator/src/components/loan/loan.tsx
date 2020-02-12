import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Select from '../select';
import Spinner from '../spinner';
import loanProps from './types';

const Loan = (props: loanProps) => {
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

export default Loan;
