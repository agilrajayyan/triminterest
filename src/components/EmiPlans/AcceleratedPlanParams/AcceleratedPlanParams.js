import { useState, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UserPreferenceContext } from '../../../utils/UserPreferenceContext';
import { getCurrencySymbol } from '../../../utils/helper';
import classes from './AcceleratedPlanParams.module.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  MenuItem,
  Select,
  Checkbox,
  Input,
  InputAdornment,
  Typography,
  FormControl,
  Tooltip,
} from '@mui/material';
import CommonDialog from '../../CommonDialog/CommonDialog';
import { useTranslation } from 'react-i18next';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function AcceleratedPlanParams(props) {
  const [emiHikeRate, setEmiHikeRate] = useState({ enabled: true, value: 5 });
  const [regularPrepayment, setRegularPrepayment] = useState({
    enabled: false,
    amount: 1000,
    interval: 'year',
  });
  const [isPrepaymentInfoDialogOpen, setIsPrepaymentInfoDialogOpen] =
    useState(false);
  const userPreference = useContext(UserPreferenceContext);
  const { locale, currency } = userPreference;
  const { t } = useTranslation();

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
          <FormControl variant="standard" sx={{ width: '8ch' }}>
            <Input
              id="standard-adornment-weight"
              value={emiHikeRate.value}
              type="number"
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
              sx={{ fontSize: '0.875rem' }}
            />
          </FormControl>
          <Typography variant="body2">
            {t('acc.plan.increase.emi.text')}
          </Typography>
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
          <div className={classes.prepayments_container}>
            <Typography variant="body2">
              {t('acc.plan.prepayment.text')}
            </Typography>
            <FormControl sx={{ width: '11ch' }}>
              <Input
                id="standard-adornment-weight"
                type="number"
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
                sx={{ fontSize: '0.875rem' }}
              />
            </FormControl>
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
                sx={{ fontSize: '0.875rem' }}
              >
                <MenuItem value={'year'} sx={{ fontSize: '0.875rem' }}>
                  {t('acc.plan.prepayment.yearly')}
                </MenuItem>
                <MenuItem value={'quarter'} sx={{ fontSize: '0.875rem' }}>
                  {t('acc.plan.prepayment.quarterly')}
                </MenuItem>
                <MenuItem value={'month'} sx={{ fontSize: '0.875rem' }}>
                  {t('acc.plan.prepayment.monthly')}
                </MenuItem>
              </Select>
            </FormControl>

            <InfoOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsPrepaymentInfoDialogOpen(true)}
            />
            <ThemeProvider theme={lightTheme}>
              <CommonDialog
                content={t('acc.plan.prepayment.info.text')}
                open={isPrepaymentInfoDialogOpen}
                onClose={() => setIsPrepaymentInfoDialogOpen(false)}
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AcceleratedPlanParams;
