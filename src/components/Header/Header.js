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
import { useTranslation } from 'react-i18next';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const languages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'pt-PT', name: 'Portuguese' },
];

function Header(props) {
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState(null);
  const [locale, setLocale] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const { t, i18n } = useTranslation();

  const updateCurrency = (value) => {
    setCurrency(value);
    localStorage.setItem('currency', JSON.stringify(value));
  };

  const updateLocale = (value) => {
    setLocale(value);
    i18n.changeLanguage(value.code);
    localStorage.setItem('locale', JSON.stringify(value));
  };

  const fetchData = async () => {
    setShowBackdrop(true);
    const { currencies: currenciesResponse } = await (
      await fetch('currencies.json')
    ).json();
    setCurrencies(currenciesResponse);

    const storedCurrency = localStorage.getItem('currency');
    const storedLocale = localStorage.getItem('locale');
    if (storedCurrency && storedLocale) {
      setCurrency(JSON.parse(storedCurrency));
      setLocale(JSON.parse(storedLocale));
      i18n.changeLanguage(JSON.parse(storedLocale).code);
      setShowBackdrop(false);
      return;
    }

    const fallbackCurrency = {
      name: 'US Dollar',
      code: 'USD',
      flag: 'https://flagcdn.com/us.svg',
    };
    const fallbackLocale = { code: 'en-US', name: 'English (US)' };

    try {
      const { currency: ipapiCurrencyCode, languages: ipapiLanguages } = await (
        await fetch('https://ipapi.co/json')
      ).json();

      const currencyIndex = currenciesResponse.findIndex(
        (currencyElem) => currencyElem.code === ipapiCurrencyCode
      );
      if (currencyIndex !== -1) {
        updateCurrency(currenciesResponse[currencyIndex]);
      } else {
        updateCurrency(fallbackCurrency);
      }

      const languageIndex = languages.findIndex(
        (languageElem) => languageElem.code === ipapiLanguages[0]
      );
      if (languageIndex !== -1) {
        updateLocale(languages[languageIndex]);
      } else {
        updateLocale(fallbackLocale);
      }
    } catch (error) {
      setShowBackdrop(false);
      updateCurrency(fallbackCurrency);
      updateLocale(fallbackLocale);
    }
    setShowBackdrop(false);
  };

  const currencyChangeHandler = (event, selectedCurrency) => {
    if (selectedCurrency) {
      updateCurrency(selectedCurrency);
    }
  };

  const localeChangeHandler = (event, selectedLocale) => {
    if (selectedLocale) {
      updateLocale(selectedLocale);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currency && locale) {
      props.onChangePreference({
        currency: currency.code,
        locale: locale.code,
      });
    }
  }, [currency, locale]);

  const currencyInput = (
    <Autocomplete
      id="currency-auto-complete"
      sx={{ width: 230 }}
      value={currency}
      onChange={currencyChangeHandler}
      options={currencies}
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
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <span style={{ display: 'flex' }}>
          <TextField
            {...params}
            label={t('preference.currency.label')}
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
      onChange={localeChangeHandler}
      options={languages}
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
          label={t('preference.language.label')}
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
              {t('preference.title')}
            </Typography>
          </div>
          <div className={classes.drawer_inputs_container}>
            {currencyInput}
            {localeInput}
          </div>
        </Box>
      </SwipeableDrawer>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
export default Header;
