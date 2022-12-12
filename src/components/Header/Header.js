import { useState, useEffect, createContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import classes from './Header.module.css';
import { db } from '../../index';
import { collection, getDocs } from 'firebase/firestore';

function Header(props) {
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState({
    name: 'US Dollar',
    code: 'USD',
  });
  const [locale, setLocale] = useState('en-US');

  const languages = ['en-US', 'de-DE', 'it-IT'];

  const fetchCurrencies = async () => {
    const querySnapshot = await getDocs(collection(db, 'currencies'));
    const response = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setCurrencies(response);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    props.onChangePreference({ currency: currency.code, locale });
  }, [currency, locale]);

  return (
    <div className={classes.header_container}>
      <Autocomplete
        id="currency-auto-complete"
        sx={{ width: 250 }}
        value={currency}
        onChange={(event, newValue) => setCurrency(newValue)}
        options={currencies}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              height="20"
              width="30"
              styles={{ padding: '10px 0' }}
              src={option.flag}
              alt={option.name}
            />
            {option.code} {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
      <Autocomplete
        id="locale-auto-complete"
        sx={{ width: 200 }}
        value={locale}
        onChange={(event, newValue) => setLocale(newValue)}
        options={languages}
        autoHighlight
        getOptionLabel={(option) => option}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </div>
  );
}
export default Header;
