import React, { useState, useEffect } from 'react';
import { FormControl, NativeSelect } from '@material-ui/core'

import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../Api';

const CountryPicker = ({ handleCountryChange }) => {

    const [fetchCountry, setCountries] = useState([]);

    useEffect(() => {
        const fetchAllCountry = async () => {
            setCountries(await fetchCountries());
        }
        fetchAllCountry();
    }, [setCountries]);

    // console.log(fetchCountry);

    return (
        <FormControl className={styles.formControle}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {
                    fetchCountry.map((country, indx) => (
                        <option key={indx} value={country}>{country}</option>
                    ))
                }
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;