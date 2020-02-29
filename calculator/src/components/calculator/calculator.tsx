import React from 'react';
import IpService from '../../services/ip';
import Loan from '../loan';
import Lease from '../lease';
import TabSwitcher from '../tab-switcher/tab-switcher';
import getData from '../../services/data-mock';
import { trim, trimWithSign } from '../../utils/utils';
import InfoCard from '../info-card';
import './calculator.css';
import { ipService, calculatorState } from './types';

class Calculator extends React.Component {
  IpService: ipService;

  state: calculatorState;

  constructor(props) {
    super(props);

    this.IpService = new IpService();

    this.state = {
      isLoadingZip: true,
      currentTab: 'loan',

      zip: '',
      downPayment: '',
      creditScore: '750',
      creditScoreValue: '0.95',
      term: '24',
      tradeInValue: '',
      mileage: '12000',
      apr: '',
      autoData: {
        vehicleName: '',
        msrp: 0,
        dealerName: '',
        dealerPhoneNumber: '',
        dealerRating: 0,
      },

      taxes: '',
      monthlyPaymentLoan: 0,
      monthlyPaymentLease: 0,

      isTradeInError: false,
      isDownPaymentError: false,
    };

    this.zipChange = this.zipChange.bind(this);
    this.tradeInChange = this.tradeInChange.bind(this);
    this.downPaymentsChange = this.downPaymentsChange.bind(this);
    this.creditScoreChange = this.creditScoreChange.bind(this);
    this.termChange = this.termChange.bind(this);
    this.aprChange = this.aprChange.bind(this);
    this.mileageChange = this.mileageChange.bind(this);
    this.switchTab = this.switchTab.bind(this);
  }

  async componentDidMount() {
    const storage = sessionStorage.getItem('state');
    if (storage) {
      this.setState({ ...JSON.parse(storage), isLoadingZip: false });
    } else {
      const zip = await this.IpService.getZip();
      const autoData = await getData();
      this.setState({
        zip, autoData, isLoadingZip: false,
      });
    }
  }

  async componentDidUpdate(_: Record<string, number>, prevState: calculatorState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      const { isTradeInError, isDownPaymentError } = this.state;
      this.updateTaxes();

      if (!isTradeInError && !isDownPaymentError) {
        this.updateMonthlyPaymentLoan();
        this.updateMonthlyPaymentLease();
      }

      sessionStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  zipChange(newZip: string) {
    const zip = trim(newZip);
    this.setState({ zip });
  }

  tradeInChange(newTradeIn: string) {
    const { autoData: { msrp } } = this.state;
    const tradeInValue = trimWithSign(newTradeIn);

    if (Number(tradeInValue) > msrp / 4) {
      this.setState({
        tradeInValue,
        isTradeInError: true,
      });
    } else {
      this.setState({
        tradeInValue,
        isTradeInError: false,
      });
    }
  }

  downPaymentsChange(newDownPayment: string) {
    const { autoData: { msrp } } = this.state;
    const downPayment = trimWithSign(newDownPayment);

    if (Number(downPayment) > msrp / 4) {
      this.setState({
        downPayment,
        isDownPaymentError: true,
      });
    } else {
      this.setState({
        downPayment,
        isDownPaymentError: false,
      });
    }
  }

  creditScoreChange(newCreditScore: string) {
    const creditScore = newCreditScore;
    let { creditScoreValue } = this.state;

    if (+creditScore >= 750) {
      creditScoreValue = '0.95';
    } else if (+creditScore >= 700 && +creditScore < 750) {
      creditScoreValue = '1';
    } else if (+creditScore >= 640 && +creditScore < 700) {
      creditScoreValue = '1.05';
    } else {
      creditScoreValue = '1.2';
    }

    this.setState({ creditScore, creditScoreValue });
  }

  termChange(newTerm: string) {
    const term = newTerm;
    this.setState({ term });
  }

  aprChange(newApr: string) {
    const apr = trimWithSign(newApr);
    this.setState({ apr });
  }

  mileageChange(newMileage: string) {
    const mileage = newMileage;
    this.setState({ mileage });
  }

  updateTaxes() {
    const { zip } = this.state;
    const taxes = zip
      .split('')
      .map((el) => `${+el * 11}%`)
      .join(', ');

    this.setState({ taxes });
  }

  calculateMonthlyPaymentLoan() {
    const {
      tradeInValue, downPayment, creditScoreValue, term,
    } = this.state;
    let { apr } = this.state;
    const { autoData } = this.state;
    const { msrp } = autoData;

    if (Number.isNaN(+apr)) {
      apr = '0';
    }

    const monthlyPaymentLoan = Math.round(
      ((+msrp - +tradeInValue - +downPayment) / +term) * +creditScoreValue * +apr,
    );

    return new Promise((resolve) => {
      resolve(monthlyPaymentLoan);
    });
  }

  calculateMonthlyPaymentLease() {
    const {
      tradeInValue, downPayment, mileage, creditScoreValue, term,
    } = this.state;
    const { autoData } = this.state;
    const { msrp } = autoData;

    const monthlyPaymentLease = Math.round(
      (msrp - +tradeInValue - +downPayment)
      * (+mileage / 10000 / +term) * +creditScoreValue,
    );

    return new Promise((resolve) => {
      resolve(monthlyPaymentLease);
    });
  }

  async updateMonthlyPaymentLease() {
    const monthlyPaymentLease = await Promise
      .resolve(this.calculateMonthlyPaymentLease())
      .then((res) => res);

    this.setState({ monthlyPaymentLease });
  }

  async updateMonthlyPaymentLoan() {
    const monthlyPaymentLoan = await Promise
      .resolve(this.calculateMonthlyPaymentLoan())
      .then((res) => res);

    this.setState({ monthlyPaymentLoan });
  }

  switchTab(tabName) {
    this.setState({ currentTab: tabName });
  }

  render() {
    const {
      zip, tradeInValue, downPayment, creditScore, term, autoData,
      monthlyPaymentLoan, taxes, mileage, currentTab, apr, monthlyPaymentLease,
      isLoadingZip, isDownPaymentError, isTradeInError,
    } = this.state;

    const tab = currentTab === 'loan' ? (
      <Loan
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
        isTradeInError={isTradeInError}
        isDownPaymentError={isDownPaymentError}
        isLoadingZip={isLoadingZip}
      />
    )
      : (
        <Lease
          zip={zip}
          tradeInValue={tradeInValue}
          downPayment={downPayment}
          creditScore={creditScore}
          term={term}
          mileage={mileage}
          onZipChange={this.zipChange}
          onTradeInChange={this.tradeInChange}
          onDownPaymentChange={this.downPaymentsChange}
          onCreditScoreChange={this.creditScoreChange}
          onTermChange={this.termChange}
          onMileageChange={this.mileageChange}
          isTradeInError={isTradeInError}
          isDownPaymentError={isDownPaymentError}
        />
      );

    const monthlyPayment = currentTab === 'loan'
      ? monthlyPaymentLoan
      : monthlyPaymentLease;

    return (
      <div className="container-sm mt-5 d-flex justify-content-between flex-wrap w-100">
        <div className="d-flex flex-column left">
          <TabSwitcher
            currentTab={currentTab}
            onTabClick={this.switchTab}
          />
          {tab}
        </div>
        <div
          className="border border-secondary rounded mt-5 mb-5 p-4 d-flex flex-column right"
        >
          <InfoCard
            monthlyPayment={monthlyPayment}
            taxes={taxes}
            autoData={autoData}
          />
        </div>
      </div>
    );
  }
}

export default Calculator;
