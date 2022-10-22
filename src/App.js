import classes from './App.module.css';
import { analytics } from './index';
import { logEvent } from 'firebase/analytics';

function App() {
  const clickHandler = () => {
    logEvent(analytics, 'stay_tuned_clicked');
  };

  return (
    <div className={classes.App}>
      <header className={classes['App-header']}>
        <p onClick={clickHandler}>Stay tuned!</p>
      </header>
    </div>
  );
}

export default App;
