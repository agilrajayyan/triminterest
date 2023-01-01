import { useContext } from 'react';
import classes from './EmiDetailsTable.module.css';
import { Typography, Tooltip } from '@mui/material';
import {
  formatNumber,
  getMonthByIndex,
  getCurrencySymbol,
} from '../../../../utils/helper';
import { UserPreferenceContext } from '../../../../utils/UserPreferenceContext';
import { useTranslation } from 'react-i18next';

function EmiDetailsTable(props) {
  const tableHeaderCell = `${classes.table_header_cell}`;
  const borderClass = props.prepaymentEnabled
    ? classes.row_light
    : classes.row_dark;
  const userPreference = useContext(UserPreferenceContext);
  const { locale, currency } = userPreference;
  const { t } = useTranslation();

  return (
    <table className={`${classes.table} ${props.classes}`}>
      <thead>
        <tr className={borderClass}>
          <th className={classes.month_cell}>
            <Typography variant="subtitle2">
              {t('table.column.month')}
            </Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">
              {t('table.column.emi')} ({getCurrencySymbol(locale, currency)})
            </Typography>
          </th>
          <th className={`${tableHeaderCell} ${classes.principal_column}`}>
            <Typography variant="subtitle2">
              {t('table.column.principal')} (
              {getCurrencySymbol(locale, currency)})
            </Typography>
          </th>
          <th className={`${tableHeaderCell} ${classes.interest_column}`}>
            <Typography variant="subtitle2">
              {t('table.column.interest')} (
              {getCurrencySymbol(locale, currency)})
            </Typography>
          </th>
          {props.prepaymentEnabled && (
            <th className={tableHeaderCell}>
              <Typography variant="subtitle2">
                {t('table.column.prepayment')} (
                {getCurrencySymbol(locale, currency)})
              </Typography>
            </th>
          )}
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">
              {t('table.column.remaining.loan')} (
              {getCurrencySymbol(locale, currency)})
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.payments?.map((elem) => {
          return (
            <tr key={elem.loanRemaining} className={borderClass}>
              <td className={classes.month_cell}>
                <Typography variant="body2">
                  {getMonthByIndex(elem.paymentDate.getMonth())}
                </Typography>
              </td>
              <td className={classes.table_cell}>
                <Tooltip
                  title={formatNumber(elem.emi, {
                    locale,
                    isCompact: false,
                    roundOff: true,
                  })}
                >
                  <Typography variant="body2">
                    {formatNumber(elem.emi, {
                      locale,
                      isCompact: true,
                      roundOff: true,
                    })}
                  </Typography>
                </Tooltip>
              </td>
              <td
                className={`${classes.table_cell} ${classes.principal_column}`}
              >
                <Tooltip
                  title={formatNumber(elem.pricipalComponent, {
                    locale,
                    isCompact: false,
                    roundOff: true,
                  })}
                >
                  <Typography variant="body2">
                    {formatNumber(elem.pricipalComponent, {
                      locale,
                      isCompact: true,
                      roundOff: true,
                    })}
                  </Typography>
                </Tooltip>
              </td>
              <td
                className={`${classes.table_cell} ${classes.interest_column}`}
              >
                <Tooltip
                  title={formatNumber(elem.interestComponent, {
                    locale,
                    isCompact: false,
                    roundOff: true,
                  })}
                >
                  <Typography variant="body2">
                    {formatNumber(elem.interestComponent, {
                      locale,
                      isCompact: true,
                      roundOff: true,
                    })}
                  </Typography>
                </Tooltip>
              </td>
              {props.prepaymentEnabled && (
                <td className={classes.table_cell}>
                  <Tooltip
                    title={formatNumber(elem.regularPrepaymentAmount, {
                      locale,
                      isCompact: false,
                      roundOff: true,
                    })}
                  >
                    <Typography variant="body2">
                      {formatNumber(elem.regularPrepaymentAmount, {
                        locale,
                        isCompact: true,
                        roundOff: true,
                      })}
                    </Typography>
                  </Tooltip>
                </td>
              )}
              <td className={classes.table_cell}>
                <Tooltip
                  title={formatNumber(elem.loanRemaining, {
                    locale,
                    isCompact: false,
                    roundOff: true,
                  })}
                >
                  <Typography variant="body2">
                    {formatNumber(elem.loanRemaining, {
                      locale,
                      isCompact: true,
                      roundOff: true,
                    })}
                  </Typography>
                </Tooltip>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EmiDetailsTable;
