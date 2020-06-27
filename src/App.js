import React, { Component } from 'react';

import { fetchData } from './Api';
import { Cards, Chart, CountryPicker } from './Components';
import styles from './App.module.css';

import covidImg from './images/image.png';

class App extends Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country)=> {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  }

  render() {

    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img src={covidImg} alt="covid-19" className={styles.image}/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App;
