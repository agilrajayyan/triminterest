import classes from './AcceleratedPlanParams.module.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect, useContext } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UserPreferenceContext } from '../../../utils/UserPreferenceContext';
import { getCurrencySymbol } from '../../../utils/helper';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function AcceleratedPlanParams(props) {
  const [emiHikeRate, setEmiHikeRate] = useState({ enabled: true, value: 5 });
  const [regularPrepayment, setRegularPrepayment] = useState({
    enabled: false,
    amount: 1000,
    interval: 'year',
  });
  const userPreference = useContext(UserPreferenceContext);
  const { locale, currency } = userPreference;

  useEffect(() => {
    props.onChangeParams({
      emiHikeRate: emiHikeRate.enabled ? emiHikeRate : null,
      regularPrepayment: regularPrepayment.enabled ? regularPrepayment : null,
    });
  }, [emiHikeRate, regularPrepayment]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.params_container}>
        <div className={classes.prepayment_condition}>
          <Checkbox
            checked={emiHikeRate.enabled}
            onChange={(event) =>
              setEmiHikeRate((prevEmiHikeRate) => {
                return {
                  ...prevEmiHikeRate,
                  enabled: event.target.checked,
                };
              })
            }
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <FormControl variant="standard" sx={{ width: '10ch' }}>
            <Input
              id="standard-adornment-weight"
              value={emiHikeRate.value}
              endAdornment={<InputAdornment position="start">%</InputAdornment>}
              onChange={(event) =>
                setEmiHikeRate((prevEmiHikeRate) => {
                  return {
                    ...prevEmiHikeRate,
                    value: Number(event.target.value),
                  };
                })
              }
              inputProps={{
                'aria-label': 'emiHikeRate',
              }}
            />
          </FormControl>
          <Typography variant="body2">increase in EMI every year</Typography>
        </div>
        <div className={classes.prepayment_condition}>
          <Checkbox
            checked={regularPrepayment.enabled}
            onChange={(event) => {
              const checked = event.target.checked;
              setRegularPrepayment((prevRegularPrepayment) => {
                return {
                  ...prevRegularPrepayment,
                  enabled: checked,
                };
              });
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <FormControl sx={{ width: '10ch' }}>
            <Input
              id="standard-adornment-weight"
              value={regularPrepayment.amount}
              startAdornment={
                <InputAdornment position="start">
                  {getCurrencySymbol(locale, currency)}
                </InputAdornment>
              }
              onChange={(event) =>
                setRegularPrepayment((prevRegularPrepayment) => {
                  return {
                    ...prevRegularPrepayment,
                    amount: Number(event.target.value),
                  };
                })
              }
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
          </FormControl>
          <Typography variant="body2">additional payment every year</Typography>
          <FormControl variant="standard">
            <Select
              id="demo-select-small"
              value={regularPrepayment.interval}
              onChange={(event) =>
                setRegularPrepayment((prevRegularPrepayment) => {
                  return {
                    ...prevRegularPrepayment,
                    interval: event.target.value,
                  };
                })
              }
            >
              <MenuItem value={'year'}>Year</MenuItem>
              <MenuItem value={'quarter'}>Quarter</MenuItem>
              <MenuItem value={'month'}>Month</MenuItem>
            </Select>
          </FormControl>
          <Tooltip
            title="Make sure to read the terms and conditions of your loan. Some loan schemes may not let the customer make a prepayment without additional charges."
            placement="right-start"
          >
            <InfoOutlinedIcon sx={{ cursor: 'pointer' }}></InfoOutlinedIcon>
          </Tooltip>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AcceleratedPlanParams;
