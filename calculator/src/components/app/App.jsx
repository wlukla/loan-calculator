/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Tab from '../tab';
import InfoCard from '../info-card';

const App = () => (
  <div className="container-sm mt-5 d-flex justify-content-between">
    <Tab />
    <InfoCard msrp="100" monthlyPayment="1000" taxes="1,2,3" />
  </div>
);

export default App;
