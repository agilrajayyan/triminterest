import { useContext } from 'react';
import classes from './EmiDetailsTable.module.css';
import Typography from '@mui/material/Typography';
import {
  formatNumber,
  getMonthByIndex,
  getCurrencySymbol,
} from '../../../../utils/helper';
import { UserPreferenceContext } from '../../../../utils/UserPreferenceContext';

function EmiDetailsTable(props) {
  const tableHeaderCell = `${classes.table_header_cell}`;
  const borderClass = props.prepaymentEnabled
    ? classes.row_light
    : classes.row_dark;
  const userPreference = useContext(UserPreferenceContext);
  const { locale, currency } = userPreference;

  return (
    <table className={`${classes.table} ${props.classes}`}>
      <thead>
        <tr className={borderClass}>
          <th className={classes.month_cell}>
            <Typography variant="subtitle2">Month</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">
              EMI ({getCurrencySymbol(locale, currency)})
            </Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">
              Principal ({getCurrencySymbol(locale, currency)})
            </Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">
              Interest ({getCurrencySymbol(locale, currency)})
            </Typography>
          </th>
          {props.prepaymentEnabled && (
            <th className={tableHeaderCell}>
              <Typography variant="subtitle2">
                Prepayment ({getCurrencySymbol(locale, currency)})
              </Typography>
            </th>
          )}
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">
              Remaining Loan ({getCurrencySymbol(locale, currency)})
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
                <Typography variant="body2">
                  {formatNumber(elem.emi, locale)}
                </Typography>
              </td>
              <td className={classes.table_cell}>
                <Typography variant="body2">
                  {formatNumber(elem.pricipalComponent, locale)}
                </Typography>
              </td>
              <td className={classes.table_cell}>
                <Typography variant="body2">
                  {formatNumber(elem.interestComponent, locale)}
                </Typography>
              </td>
              {props.prepaymentEnabled && (
                <td className={classes.table_cell}>
                  <Typography variant="body2">
                    {formatNumber(elem.regularPrepaymentAmount, locale)}
                  </Typography>
                </td>
              )}
              <td className={classes.table_cell}>
                <Typography variant="body2">
                  {formatNumber(elem.loanRemaining, locale)}
                </Typography>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EmiDetailsTable;
