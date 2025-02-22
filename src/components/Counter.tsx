import { DateTime } from "luxon";
import { Component, createMemo, createSignal, onCleanup, Show } from "solid-js";
import { CounterDates } from "../models/counter-date";
import "./Counter.css";

export const Counter: Component<CounterDates> = (props) => {
  const [currentDate, setCurrentDate] = createSignal<DateTime>();
  const payDate = () => props?.paydayDate;

  const formatTimeNumber = (timeUnit: number) => ~~timeUnit < 10 ? `0${~~timeUnit}` : `${~~timeUnit}`;
  const formatTime = (hour: number, minute: number, second: number) => {
    let displayHour, displayMinute, displaySecond: string;
    displayHour = formatTimeNumber(hour);
    displayMinute = formatTimeNumber(minute);
    displaySecond = formatTimeNumber(second);
    return `${displayHour}:${displayMinute}:${displaySecond}`;
  }

  const displayHoursCountdown = createMemo<string>(() => {
    if (!payDate() || !currentDate()) return '00:00:00';
    const durationDays = currentDate()!.diff(payDate()!, 'days').days;
    hourCountdown = (Math.abs(durationDays) % 1) * 24;
    minuteCountdown = (hourCountdown % 1) * 60;
    secondCountdown = (minuteCountdown % 1) * 60;

    return formatTime(hourCountdown, minuteCountdown, secondCountdown)
  });

  const displayDayCountdown = createMemo<string>(() => {
    if (!payDate()) return formatTimeNumber(0);
    const daysRemaning = Math.abs(DateTime.now().diff(payDate()!, 'days').days);
    return formatTimeNumber(daysRemaning);
  });

  const timer = setInterval(() => {
    setCurrentDate(DateTime.now())
  }, 1000);

  let hourCountdown: number;
  let minuteCountdown: number;
  let secondCountdown: number;

  onCleanup(() => clearInterval(timer));

  return (
    <div class="container mx-auto mb-24">
      <div class=" text-5xl font-bold flex justify-center mb-6">
        <div class="p-2 border-4 border-indigo-600 rounded-2xl">
          {displayDayCountdown()}:{displayHoursCountdown()}
        </div>
      </div>
      <div class="text-2xl flex justify-center">
        <Show when={currentDate()} fallback={<div>01/01/0000 - 00:00:00</div>}>
          {currentDate()?.toFormat('dd/MM/yyyy')} - {currentDate()?.toFormat('hh:mm:ss a')}
        </Show>
      </div>
    </div>
  );
};
