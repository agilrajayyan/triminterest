# Triminterest

A personal finance tool to better plan your EMIs. Calculate the EMI for your loan and get to know how much you could save by making prepayments and by increasing the EMI annualy.

### Live site: https://triminterest.com/

## Key features:

- User can generate amortization schedule for their loan.
- The schedule can be customized to include regular prepayments on a yearly/quarterly/monthly basis and/or increase the EMI by certain % every year and get to know the amount he could save in interest and how faster the loan could be paid off
- As soon as the user launces the application, the preferences i.e., currency and language will be auto-loaded based on the user's location.
- It's available in 10 languages.
- The application is fully responsive for all the screen sizes.

## Technical aspects:

- React with MUI (https://mui.com/) for the UI components & react-chartjs-2 (https://react-chartjs-2.js.org/) for the charts.
- Firebase (https://firebase.google.com/) for hosting
- Continuous Deployment with Github Actions (https://github.com/features/actions)
- https://ipapi.co API to preload the user preferences (currency & locale)
- react-i18next (https://react.i18next.com/), Internationalization API (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for localization
