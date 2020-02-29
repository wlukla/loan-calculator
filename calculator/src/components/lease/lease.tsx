import React from 'react';
import Input from '../input';
import Select from '../select';
import leaseProps from './types';

const Lease = (props: leaseProps) => {
  const {
    zip, tradeInValue, downPayment, creditScore, term, mileage,
    onZipChange, onMileageChange, onTradeInChange, onTermChange,
    onDownPaymentChange, onCreditScoreChange, isTradeInError, isDownPaymentError,
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
      >
        {[10000, 12000, 15000]}
      </Select>
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

export default Lease;
