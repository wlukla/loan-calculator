/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import IpService from '../../services/ip';

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.IpService = new IpService();

    this.state = {
      zip: '',
      tradeInValue: '$ 0',
      downPayment: '$ 0',
      creditScore: 750,
      term: 24,
      apr: '% 0',
    };
  }

  async componentDidMount() {
    const zip = await this.IpService.getZip();
    this.zipChange(zip);
  }

  zipChange(zip) {
    if (zip.length <= 5 && !zip.match(/\D/g)) {
      this.setState({ zip });
    }
  }

  tradeInChange(tradeInValue) {
    if (tradeInValue.includes('$ ') && !tradeInValue.slice(2).match(/\D/g)) {
      this.setState({ tradeInValue });
    }
  }

  downPaymentsChange(downPayment) {
    if (downPayment.includes('$ ') && !downPayment.slice(2).match(/\D/g)) {
      this.setState({ downPayment });
    }
  }

  creditScoreChange(creditScore) {
    this.setState({ creditScore });
  }

  termChange(term) {
    this.setState({ term });
  }

  aprChange(apr) {
    if (apr.includes('% ') && !apr.slice(2).match(/\D/g)) {
      this.setState({ apr });
    }
  }

  render() {
    const {
      zip, tradeInValue, downPayment, creditScore, term, apr,
    } = this.state;

    return (
      <form>
        <div className="row">
          <label className="form-group col-sm d-flex justify-content-between">
            Home zip code
            <input type="text" value={zip} onChange={(e) => this.zipChange(e.target.value)} />
          </label>
          <label className="form-group col-sm d-flex justify-content-between">
            APR
            <input type="text" value={apr} onChange={(e) => this.aprChange(e.target.value)} />
          </label>
        </div>
        <div className="row">
          <label className="form-group col-sm d-flex justify-content-between">
            Trade-in value
            <input
              type="text"
              value={tradeInValue}
              onChange={(e) => this.tradeInChange(e.target.value)}
            />
          </label>
          <label
            className="form-group col-sm d-flex justify-content-between"
            onChange={(e) => this.termChange(e.target.value)}
          >
            Term in month
            <select value={term} onChange={(e) => this.termChange(e.target.value)}>
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
        <div className="row">
          <label className="form-group col-sm d-flex justify-content-between">
            Down payment
            <input type="text" value={downPayment} onChange={(e) => this.downPaymentsChange(e.target.value)} />
          </label>
          <label className="form-group col-sm d-flex justify-content-between">
            Credit Score
            <select value={creditScore} onChange={(e) => this.creditScoreChange(e.target.value)}>
              <option value="600">600</option>
              <option value="650">650</option>
              <option value="700">700</option>
              <option value="750">750</option>
              <option value="800">800</option>
              <option value="850">850</option>
              <option value="900">900</option>
            </select>
          </label>
        </div>
      </form>
    );
  }
}

export default Tab;
