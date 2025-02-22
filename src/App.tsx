import { createMemo, type Component, Show } from 'solid-js';
import { Counter } from './components/Counter';
import './App.css';
import { DateTime, PossibleDaysInMonth } from 'luxon';
import { createForm, getValue } from '@modular-forms/solid';

type PayDayForm = {
  payDate: number;
}

const App: Component = () => {
  const [dateForm, { Form, Field }] = createForm<PayDayForm>();
  const currentDate = DateTime.now();

  const payday = createMemo<DateTime<boolean>>(() => {
    const payDate = getValue(dateForm, 'payDate');
    const today = currentDate.day;
    const defaultPayday = DateTime.fromObject({ day: 1 }).plus({ months: 1 });

    if (payDate && today >= payDate) {
      return DateTime.fromObject({ day: payDate }).plus({ months: 1 });
    } else if (payDate && today < payDate) {
      return DateTime.fromObject({ day: payDate });
    }

    return defaultPayday;
  });

  const paydayDisplay = createMemo<string>(() => {
    return payday().toFormat('dd/MM/yyyy');
  })

  const maxDate = createMemo<PossibleDaysInMonth>(() => {
    return payday().daysInMonth!;
  });

  return (
    <div class="container mx-auto p-4">
      <div class="mb-8 flex justify-center">
        <div class="w-1/3">
          <label for="payDate" class="font-semibold text-3xl">Which date is your paycheck</label>
          <Form>
            <Field name="payDate" type="number">
              {(field, props) => <input class="block w-full h-8 p-2 text-lg/7" id="payDate" type="number" max={maxDate()} min="1" {...props}></input>}
            </Field>
          </Form>
        </div>
      </div>
      <Show when={dateForm.touched}>
        <div class="text-5xl mb-8 flex justify-center">
          <h2 class="font-bold mr-2">Next Payday:</h2>
          <span class="font-semibold">{paydayDisplay()}</span>
        </div>
        <Counter paydayDate={payday()}></Counter>
        <div class="w-1/3 flex flex-col mx-auto">
          <img class="w-full mb-4" alt="meme-1" src="/img/meme1.jpg"></img>
          <img class="w-full" alt="meme-2" src="/img/meme2.jpg"></img>
        </div>
      </Show>
      <Show when={!dateForm.touched}>
        <div class="text-2xl flex justify-center mb-4">
          <div class="">Input paydate to see countdown</div>
        </div>
        <Counter paydayDate={null}></Counter>
      </Show>
    </div>
  );
};

export default App;
