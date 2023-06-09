import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../styles/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="div-wallet">
        <div className="div-header-form">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default connect()(Wallet);
