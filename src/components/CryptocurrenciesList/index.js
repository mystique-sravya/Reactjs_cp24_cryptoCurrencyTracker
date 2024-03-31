// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'

class CryptocurrenciesList extends Component {
  state = {
    cryptoCurrenciesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCryptoCurrencies()
  }

  getCryptoCurrencies = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const fetchedData = await response.json()
    const updatedCryptoData = fetchedData.map(eachCryptoCurrency => ({
      id: eachCryptoCurrency.id,
      currencyLogoUrl: eachCryptoCurrency.currency_logo,
      currencyName: eachCryptoCurrency.currency_name,
      usdValue: eachCryptoCurrency.usd_value,
      euroValue: eachCryptoCurrency.euro_value,
    }))
    this.setState({
      cryptoCurrenciesData: updatedCryptoData,
      isLoading: false,
    })
  }

  renderListContainer = () => {
    const {cryptoCurrenciesData} = this.state
    return (
      <div className="currencies-list-container">
        <div className="list-header">
          <p className="list-coin-type-heading">Coin Type</p>
          <div className="usd-and-euro-values-container">
            <p className="list-coin-value-heading">USD</p>
            <p className="list-coin-value-heading">EURO</p>
          </div>
        </div>
        <ul className="list-body">
          {cryptoCurrenciesData.map(eachCryptoCurrencyData => (
            <CryptocurrencyItem
              key={eachCryptoCurrencyData.id}
              cryptoCurrencyData={eachCryptoCurrencyData}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="sub-container">
        <h1 className="heading">Cryptocurrency Tracker</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
        />
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          this.renderListContainer()
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
