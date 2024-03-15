import { createSignal, type Component, onCleanup, createEffect } from 'solid-js';
import { DateTime } from 'luxon';
import '@material/web/button/filled-button.js';

const App: Component = () => {
  const [date, setDate] = createSignal<DateTime>();
  const [countdown, setCountdown] = createSignal<string>();
  const [paydayDisplay, setPaydayDisplay] = createSignal<string>();
  const timer = setInterval(() => {
      let dateTime;
      dateTime = DateTime.now();
      setDate(DateTime.now())
    }, 1000);

  const payday = DateTime.fromObject({ day: 5 }).plus({ months: 1 });
  console.log(payday);
  setPaydayDisplay(payday.toFormat('dd/MM/yyyy'))
  let hourCountdown: number;
  let minuteCountdown: number;
  let secondCountdown: number;
  createEffect(() => {
    const durationDays = date()?.diff(payday, 'days').days;

    if (durationDays) {
      hourCountdown = (Math.abs(durationDays) % 1) * 24;
      minuteCountdown = (hourCountdown % 1) * 60;
      secondCountdown = (minuteCountdown % 1) * 60;

      setCountdown(
        `${~~hourCountdown}:${~~minuteCountdown < 10 ? `0${~~minuteCountdown}`: ~~minuteCountdown}:${~~secondCountdown < 10 ? `0${~~secondCountdown}` : ~~secondCountdown}`);
    }
  });

  onCleanup(() => clearInterval(timer));
  return (
    <div>
      <header>
        <p>
          {date()?.toFormat('dd/MM/yyyy')}
        </p>
        <p>
          {date()?.toFormat('hh:mm:ss')}
        </p>
        <p>
          {countdown()}
        </p>
        <p>
          Next payday
        </p>
        <div>
          {paydayDisplay()}
        </div>
      </header>
    </div>
  );
};

export default App;