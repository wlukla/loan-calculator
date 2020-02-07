/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Tab = (props) => {
  const {
    zip, tradeInValue, downPayment, creditScore, term, apr,
    onZipChange, onAprChange, onTradeInChange, onTermChange,
    onDownPaymentChange, onCreditScoreChange,
  } = props;

  return (
    <form className="border border-primary rounded w-50 mt-5 p-5 mr-5">
      <div>
        <label className="form-group d-flex justify-content-between">
          Home zip code
          <input
            className="w-50"
            type="text"
            value={zip}
            onChange={onZipChange}
          />
        </label>
        <label className="form-group d-flex justify-content-between">
          APR
          <input
            className="w-50"
            type="text"
            value={apr}
            onChange={onAprChange}
          />
        </label>
      </div>
      <div>
        <label className="form-group d-flex justify-content-between">
          Trade-in value
          <input
            className="w-50"
            type="text"
            value={tradeInValue}
            onChange={onTradeInChange}
          />
        </label>
        <label className="form-group d-flex justify-content-between">
          Term in month
          <select
            className="w-50"
            value={term}
            onChange={onTermChange}
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="60">60</option>
            <option value="72">72</option>
            <option value="84">84</option>
          </select>
        </label>
      </div>
      <div>
        <label className="form-group d-flex justify-content-between">
          Down payment
          <input
            className="w-50"
            type="text"
            value={downPayment}
            onChange={onDownPaymentChange}
          />
        </label>
        <label className="form-group d-flex justify-content-between">
          Credit Score
          <select
            className="w-50"
            value={creditScore}
            onChange={onCreditScoreChange}
          >
            <option value="600">600</option>
            <option value="650">650</option>
            <option value="700">700</option>
            <option value="750">750</option>
            <option value="800">800</option>
            <option value="850">850</option>
            <option value="850">850</option>
          </select>
        </label>
      </div>
    </form>
  );
};

Tab.propTypes = {
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
};

export default Tab;
