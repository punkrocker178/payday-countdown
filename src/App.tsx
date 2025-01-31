import { createMemo, type Component } from 'solid-js';
import { Counter } from './components/Counter';
import './App.css';
import { DateTime } from 'luxon';
import { createForm, getValue } from '@modular-forms/solid';

type PayDayForm = {
  payDate: number;
}

const App: Component = () => {
  const [dateForm, { Form, Field }] = createForm<PayDayForm>();

  const payday = createMemo<DateTime<boolean>>(() => {
    const payDate = getValue(dateForm, 'payDate');
    const today = DateTime.now().day;
    const defaultPayday = DateTime.fromObject({ day: 1 }).plus({ months: 1 });

    if (payDate && today > payDate) {
      return DateTime.fromObject({ day: payDate }).plus({ months: 1 });
    } else if (payDate && today < payDate) {
      return DateTime.fromObject({ day: payDate });
    }

    return defaultPayday;
  });
  
  const paydayDisplay = createMemo<string>(() => {
    return payday().toFormat('dd/MM/yyyy');
  })

  return (
    <div class="container mx-auto">
      <div class="mb-12">
        <label for="payDate" class="font-semibold">When is your payday</label>
        <Form>
          <Field name="payDate" type="number">
            {(field, props) => <input class="block form" id="payDate" type="number" max="31" min="1" {...props}></input>}
          </Field>
        </Form>
      </div>
      <div class="text-5xl">
        <h2 class="font-bold">Next Payday</h2>
        <p class="font-semibold">{paydayDisplay()}</p>
      </div>
      <Counter paydayDate={payday()}></Counter>
      <div class="w-1/3 flex flex-col mx-auto">
        <img class="w-full mb-4" alt="meme-1" src="/img/meme1.jpg"></img>
        <img class="w-full" alt="meme-2" src="/img/meme2.jpg"></img>
      </div>
    </div>
  );
};

export default App;
