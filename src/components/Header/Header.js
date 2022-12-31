import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import classes from './Header.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const languages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
];

function Header(props) {
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState(() => {
    const fallbackValue = {
      name: 'US Dollar',
      code: 'USD',
      flag: 'https://flagcdn.com/us.svg',
    };
    const storedCurrency = localStorage.getItem('currency');
    return storedCurrency ? JSON.parse(storedCurrency) : fallbackValue;
  });
  const [locale, setLocale] = useState(() => {
    const fallbackValue = { code: 'en-US', name: 'English (US)' };
    const storedLocale = localStorage.getItem('locale');
    return storedLocale ? JSON.parse(storedLocale) : fallbackValue;
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchCurrencies = async () => {
    const response = await fetch('currencies.json');
    const responseJson = await response.json();
    setCurrencies(responseJson.currencies);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    props.onChangePreference({ currency: currency.code, locale: locale.code });
    localStorage.setItem('currency', JSON.stringify(currency));
    localStorage.setItem('locale', JSON.stringify(locale));
  }, [currency, locale]);

  const currencyInput = (
    <Autocomplete
      id="currency-auto-complete"
      sx={{ width: 230 }}
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
            src={option.flag}
            alt={option.name}
          />
          {option.name} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <span style={{ display: 'flex' }}>
          <TextField
            {...params}
            label="Currency"
            inputProps={{
              ...params.inputProps,
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
        </span>
      )}
    />
  );

  const localeInput = (
    <Autocomplete
      id="locale-auto-complete"
      sx={{ width: 230 }}
      value={locale}
      onChange={(event, newValue) => setLocale(newValue)}
      options={languages}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Language"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <header className={classes.header_container}>
        <img
          src="/logo.png"
          className={classes.logo}
          height="45"
          alt="triminterest logo"
        />
        <div className={classes.inputs_container}>
          {currencyInput}
          {localeInput}
        </div>
        <MenuIcon
          className={classes.menu_icon}
          onClick={() => setIsDrawerOpen(true)}
        />
      </header>
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        variant="temporary"
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      >
        <Box role="presentation" className={classes.drawer_container}>
          <div className={classes.drawer_title_container}>
            <ArrowBackIcon
              className={classes.back_icon}
              onClick={() => setIsDrawerOpen(false)}
            />
            <Typography variant="h6" align="left">
              Preferences
            </Typography>
          </div>
          <div className={classes.drawer_inputs_container}>
            {currencyInput}
            {localeInput}
          </div>
        </Box>
      </SwipeableDrawer>
    </ThemeProvider>
  );
}
export default Header;
