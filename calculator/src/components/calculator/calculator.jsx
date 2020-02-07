import React from 'react';
import InfoCard from '../info-card';
import IpService from '../../services/ip';
// import Loan from '../loan/loan';
import Lease from '../lease';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.IpService = new IpService();
    this.state = {
      zip: '00000',
      tradeInValue: '$ 0',
      downPayment: '$ 0',
      creditScore: '750',
      creditScoreValue: '0.95',
      term: '24',
      apr: '% 0',
      mileages: '12000',
      monthlyPaymentLoan: '0',
      taxes: [0, 0, 0, 0, 0],
      termOptions: [12, 24, 36, 48, 60, 72],
      creditScoreOptions: [600, 650, 700, 750, 800, 850, 900],
      mileagesOptions: [10000, 12000, 15000],
    };

    this.zipChange = this.zipChange.bind(this);
    this.tradeInChange = this.tradeInChange.bind(this);
    this.downPaymentsChange = this.downPaymentsChange.bind(this);
    this.creditScoreChange = this.creditScoreChange.bind(this);
    this.termChange = this.termChange.bind(this);
    this.aprChange = this.aprChange.bind(this);
    this.mileagesChange = this.mileagesChange.bind(this);
  }

  async componentDidMount() {
    const zip = await this.IpService.getZip();
    this.setState({ zip });
  }

  componentDidUpdate(_, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.calculateTaxes();
      this.calculateMonthlyPaymentLoan();
    }
  }

  zipChange(e) {
    const zip = e.target.value;
    if (zip.length <= 5 && !zip.match(/\D/g)) {
      this.setState({ zip });
    }
  }

  tradeInChange(e) {
    const tradeInValue = e.target.value;
    if (tradeInValue.includes('$ ') && !tradeInValue.slice(2).match(/\D/g)) {
      this.setState({ tradeInValue });
    }
  }

  downPaymentsChange(e) {
    const downPayment = e.target.value;
    if (downPayment.includes('$ ') && !downPayment.slice(2).match(/\D/g)) {
      this.setState({ downPayment });
    }
  }

  creditScoreChange(e) {
    const creditScore = e.target.value;
    let { creditScoreValue } = this.state;
    if (creditScore >= 750) {
      creditScoreValue = 0.95;
    } else if (creditScore >= 700 && creditScore < 750) {
      creditScoreValue = 1;
    } else if (creditScore >= 640 && creditScore < 700) {
      creditScoreValue = 1.05;
    } else {
      creditScoreValue = 1.2;
    }

    this.setState({ creditScore, creditScoreValue });
  }

  termChange(e) {
    const term = e.target.value;
    this.setState({ term });
  }

  aprChange(e) {
    const apr = e.target.value;
    if (apr.includes('% ') && !apr.slice(2).match(/\D/g) && apr.length <= 5) {
      this.setState({ apr });
    }
  }

  mileagesChange(e) {
    const mileages = e.target.value;
    this.setState({ mileages });
  }

  calculateTaxes() {
    const { zip } = this.state;
    const taxes = zip.split('').map((el) => +el * 11);
    this.setState({ taxes });
  }

  calculateMonthlyPaymentLoan() {
    let {
      tradeInValue, downPayment, apr, creditScoreValue, term,
    } = this.state;
    creditScoreValue = Number(creditScoreValue);
    term = Number(term);
    tradeInValue = Number(tradeInValue.slice(2));
    downPayment = Number(downPayment.slice(2));
    apr = Number(apr.slice(2));

    const calculateMonthlyPaymentLoan = String(
      ((10000 - tradeInValue - downPayment) / term) * creditScoreValue * apr,
    );
    this.setState({ calculateMonthlyPaymentLoan });
  }

  render() {
    const {
      zip, tradeInValue, downPayment, creditScore, term, apr,
      monthlyPaymentLoan, taxes, termOptions, creditScoreOptions,
      mileagesOptions, mileages,
    } = this.state;
    return (
      <div className="container-sm mt-5 d-flex justify-content-between">
        {/* <Loan
          zip={zip}
          tradeInValue={tradeInValue}
          downPayment={downPayment}
          creditScore={creditScore}
          term={term}
          apr={apr}
          onZipChange={this.zipChange}
          onTradeInChange={this.tradeInChange}
          onDownPaymentChange={this.downPaymentsChange}
          onCreditScoreChange={this.creditScoreChange}
          onTermChange={this.termChange}
          onAprChange={this.aprChange}
          termOptions={termOptions}
          creditScoreOptions={creditScoreOptions}
        /> */}
        <Lease
          zip={zip}
          tradeInValue={tradeInValue}
          downPayment={downPayment}
          creditScore={creditScore}
          term={term}
          mileages={mileages}
          onZipChange={this.zipChange}
          onTradeInChange={this.tradeInChange}
          onDownPaymentChange={this.downPaymentsChange}
          onCreditScoreChange={this.creditScoreChange}
          onTermChange={this.termChange}
          onMileagesChange={this.mileagesChange}
          termOptions={termOptions}
          creditScoreOptions={creditScoreOptions}
          mileagesOptions={mileagesOptions}
        />
        <InfoCard monthlyPayment={monthlyPaymentLoan} taxes={taxes} />
      </div>
    );
  }
}

export default Calculator;
