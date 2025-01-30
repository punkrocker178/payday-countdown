import { DateTime } from "luxon";
import { Component, createMemo, createSignal, onCleanup } from "solid-js";
import { CounterDates } from "../models/counter-date";

export const Counter: Component<CounterDates> = (props) => {
  const [currentDate, setCurrentDate] = createSignal<DateTime>();
  const payDate = () => props.paydayDate;

  const formatTimeNumber = (timeUnit: number) => ~~timeUnit < 10 ? `0${~~timeUnit}` : `${~~timeUnit}`;
  const formatTime = (hour: number, minute: number, second: number) => {
    let displayHour, displayMinute, displaySecond: string;
    displayHour = formatTimeNumber(hour);
    displayMinute = formatTimeNumber(minute);
    displaySecond = formatTimeNumber(second);
    return `${displayHour}:${displayMinute}:${displaySecond}`;
  }

  const displayHoursCountdown = createMemo<string>(() => {
    const durationDays = currentDate()?.diff(payDate(), 'days').days;
    if (durationDays) {
      hourCountdown = (Math.abs(durationDays) % 1) * 24;
      minuteCountdown = (hourCountdown % 1) * 60;
      secondCountdown = (minuteCountdown % 1) * 60;

      return formatTime(hourCountdown, minuteCountdown, secondCountdown)
    }
    return '00:00:00';
  });

  const displayDayCountdown = createMemo<string>(() => {
    const daysRemaning = Math.abs(DateTime.now().diff(payDate(), 'days').days);
    return formatTimeNumber(daysRemaning);

  });

  const timer = setInterval(() => {
    let dateTime;
    dateTime = DateTime.now();
    setCurrentDate(DateTime.now())
  }, 1000);

  let hourCountdown: number;
  let minuteCountdown: number;
  let secondCountdown: number;

  onCleanup(() => clearInterval(timer));

  return (
    <div class="container mx-auto mb-32">
      <p class="flex justify-end text-3xl relative -top-10">
        {currentDate()?.toFormat('dd/MM/yyyy')} -
        {currentDate()?.toFormat('hh:mm:ss')}
      </p>
      <p class="flex justify-center text-5xl font-bold">
        {displayDayCountdown()}:{displayHoursCountdown()}
      </p>
    </div>
  );
};
