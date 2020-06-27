import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../Api';
import { red } from '@material-ui/core/colors';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {

    const [dailydata, setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchApi();
    }, []);

    const LineChart = (

        dailydata.length ?
            (
                <Line
                    data={{
                        labels: dailydata.map(({ date }) => date),
                        datasets: [
                            {
                                data: dailydata.map(({ confirmed }) => confirmed),
                                label: 'Infected',
                                borderColor: '#3333ff',
                                fill: true
                            },
                            {
                                data: dailydata.map(({ deaths }) => deaths),
                                label: 'Death',
                                borderColor: red,
                                backgroundColor: 'rgba(255,0,0, 0.5)',
                                fill: true
                            }]
                    }}
                />
            ) : null
    )

    const BarChart = (
        confirmed ?
            (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Death'],
                        datasets: [{
                            label: 'people',
                            backgroundColor: ['rgba(0,0,255, 0.5)', 'rgba(0,255,0, 0.5)', 'rgba(255,0,0, 0.5)'],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` }
                    }}
                />
            ) : null
    )

    return (
        <div className={styles.container}>
            {
                country ? BarChart : LineChart
            }
        </div>
    )
}

export default Chart;