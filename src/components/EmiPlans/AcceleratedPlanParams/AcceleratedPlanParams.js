import classes from './AcceleratedPlanParams.module.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function AcceleratedPlanParams(props) {
  const [emiHikeRate, setEmiHikeRate] = useState(5);
  const [prepaymentAmount, setPrepaymentAmount] = useState(1000);
  const [prepaymentInterval, setPrepaymentInterval] = useState('year');

  const [emiHikeRateEnabled, setEmiHikeRateEnabled] = useState(true);
  const [prepaymentEnabled, setPrepaymentEnabled] = useState(false);
  const [customPrepaymentEnabled, setCustomPrepaymentEnabled] = useState(false);

  useEffect(() => {
    if (prepaymentEnabled) {
      setCustomPrepaymentEnabled(false);
    }
  }, [prepaymentEnabled]);

  useEffect(() => {
    if (customPrepaymentEnabled) {
      setPrepaymentEnabled(false);
    }
  }, [customPrepaymentEnabled]);

  useEffect(() => {
    props.onChangeParams({
      emiHikeRate: {
        enabled: emiHikeRateEnabled,
        value: emiHikeRate,
      },
      prepayment: {
        enabled: prepaymentEnabled,
        amount: prepaymentAmount,
        interval: prepaymentInterval,
      },
    });
  }, [
    emiHikeRate,
    prepaymentAmount,
    prepaymentInterval,
    emiHikeRateEnabled,
    prepaymentEnabled,
  ]);

  return (
    <div className={classes.params_container}>
      <div className={classes.prepayment_condition}>
        <Checkbox
          checked={emiHikeRateEnabled}
          onChange={(event) => setEmiHikeRateEnabled(event.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <FormControl variant="standard" sx={{ width: '10ch' }}>
          <Input
            id="standard-adornment-weight"
            value={emiHikeRate}
            endAdornment={<InputAdornment position="start">%</InputAdornment>}
            onChange={(event) => setEmiHikeRate(Number(event.target.value))}
            inputProps={{
              'aria-label': 'emiHikeRate',
            }}
          />
        </FormControl>
        <Typography variant="body2">increase in EMI every year</Typography>
      </div>
      <div className={classes.prepayment_condition}>
        <Checkbox
          checked={prepaymentEnabled}
          onChange={(event) => setPrepaymentEnabled(event.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <FormControl sx={{ width: '10ch' }}>
          <Input
            id="standard-adornment-weight"
            value={prepaymentAmount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(event) =>
              setPrepaymentAmount(Number(event.target.value))
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
            value={prepaymentInterval}
            onChange={(event) => setPrepaymentInterval(event.target.value)}
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
      <div className={classes.custom_prepayment_switch}>
        <FormControlLabel
          labelPlacement="end"
          control={
            <Switch
              checked={customPrepaymentEnabled}
              onChange={(event) =>
                setCustomPrepaymentEnabled(event.target.checked)
              }
            />
          }
          label={<Typography variant="body2">Custom prepayment</Typography>}
        />
      </div>
    </div>
  );
}

export default AcceleratedPlanParams;
