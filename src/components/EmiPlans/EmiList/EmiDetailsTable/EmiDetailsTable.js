import classes from './EmiDetailsTable.module.css';
import Typography from '@mui/material/Typography';
import { formatNumber, getMonthByIndex } from '../../../../utils/helper';

function EmiDetailsTable(props) {
  const tableHeaderCell = `${classes.table_header_cell}`;
  const borderClass = props.prepaymentEnabled
    ? classes.row_light
    : classes.row_dark;

  return (
    <table className={`${classes.table} ${props.classes}`}>
      <thead>
        <tr className={borderClass}>
          <th className={classes.month_cell}>
            <Typography variant="subtitle2">Month</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">EMI</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">Principal</Typography>
          </th>
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">Interest</Typography>
          </th>
          {props.prepaymentEnabled && (
            <th className={tableHeaderCell}>
              <Typography variant="subtitle2">Prepayment</Typography>
            </th>
          )}
          <th className={tableHeaderCell}>
            <Typography variant="subtitle2">Loan Remaining</Typography>
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
                  {formatNumber(elem.emi)}
                </Typography>
              </td>
              <td className={classes.table_cell}>
                <Typography variant="body2">
                  {formatNumber(elem.pricipalComponent)}
                </Typography>
              </td>
              <td className={classes.table_cell}>
                <Typography variant="body2">
                  {formatNumber(elem.interestComponent)}
                </Typography>
              </td>
              {props.prepaymentEnabled && (
                <td className={classes.table_cell}>
                  <Typography variant="body2">
                    {formatNumber(elem.regularPrepaymentAmount)}
                  </Typography>
                </td>
              )}
              <td className={classes.table_cell}>
                <Typography variant="body2">
                  {formatNumber(elem.loanRemaining)}
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
