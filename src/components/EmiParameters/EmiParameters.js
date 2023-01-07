import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useContext, useReducer } from 'react';
import classes from './EmiParameters.module.css';
import { UserPreferenceContext } from '../../utils/UserPreferenceContext';
import {
  getCurrencySymbol,
  validateLoanAmount,
  validateInterestRate,
  validateNumberOfYears,
} from '../../utils/helper';
import { useTranslation } from 'react-i18next';

const emiParametersReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOAN_AMOUNT':
      return {
        ...state,
        loanAmount: {
          value: action.payload,
          ...validateLoanAmount(action.payload),
        },
      };
    case 'UPDATE_INTEREST_RATE':
      return {
        ...state,
        interestRate: {
          value: action.payload,
          ...validateInterestRate(action.payload),
        },
      };
    case 'UPDATE_NUMBER_OF_YEARS':
      return {
        ...state,
        numberOfYears: {
          value: action.payload,
          ...validateNumberOfYears(action.payload),
        },
      };
    case 'UPDATE_EMI_START_DATE':
      return {
        ...state,
        emiStartDate: action.payload,
      };
  }
};

function EmiParameters(props) {
  const [emiParameters, dispatch] = useReducer(emiParametersReducer, {
    loanAmount: {
      value: 4000000,
      isInvalid: false,
      helpText: '',
    },
    interestRate: {
      value: 7,
      isInvalid: false,
      helpText: '',
    },
    numberOfYears: {
      value: 20,
      isInvalid: false,
      helpText: '',
    },
    emiStartDate: dayjs(new Date()),
  });
  const { loanAmount, interestRate, numberOfYears, emiStartDate } =
    emiParameters;
  const { locale, currency } = useContext(UserPreferenceContext);
  const { t } = useTranslation();

  useEffect(() => {
    props.onChangeEmiParams({
      emiParameters: {
        loanAmount: loanAmount.value,
        interestRate: interestRate.value,
        numberOfYears: numberOfYears.value,
        emiStartDate: new Date(emiStartDate.$y, emiStartDate.$M, 1),
      },
      isInvalid:
        loanAmount.isInvalid ||
        interestRate.isInvalid ||
        numberOfYears.isInvalid,
    });
  }, [emiParameters]);

  return (
    <section className={classes.inputs_container}>
      <TextField
        label={t('emi.params.loan.amount')}
        type="number"
        id="outlined-start-adornment"
        value={loanAmount.value}
        error={loanAmount.isInvalid}
        helperText={loanAmount.errorText}
        onChange={(event) =>
          dispatch({ type: 'UPDATE_LOAN_AMOUNT', payload: event.target.value })
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {getCurrencySymbol(locale, currency)}
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label={t('emi.params.interest.rate')}
        type="number"
        id="outlined-end-adornment"
        value={interestRate.value}
        error={interestRate.isInvalid}
        helperText={interestRate.errorText}
        onChange={(event) =>
          dispatch({
            type: 'UPDATE_INTEREST_RATE',
            payload: event.target.value,
          })
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />
      <TextField
        label={t('emi.params.loan.tenure')}
        type="number"
        id="outlined-end-adornment"
        value={numberOfYears.value}
        error={numberOfYears.isInvalid}
        helperText={numberOfYears.errorText}
        onChange={(event) =>
          dispatch({
            type: 'UPDATE_NUMBER_OF_YEARS',
            payload: event.target.value,
          })
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {t('emi.params.years')}
            </InputAdornment>
          ),
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={t('emi.params.start.date')}
          views={['year', 'month']}
          value={emiStartDate}
          onChange={(value) => {
            dispatch({
              type: 'UPDATE_EMI_START_DATE',
              payload: value,
            });
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </section>
  );
}

export default EmiParameters;
