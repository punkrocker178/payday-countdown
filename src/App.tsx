import { createSignal, type Component } from 'solid-js';
import { Counter } from './components/Counter';
import { DateTime } from 'luxon';

const App: Component = () => {
  const [payday, setPayday] = createSignal<DateTime<boolean>>(DateTime.fromObject({ day: 5 }).plus({ months: 1 }));
  const [paydayDisplay, setPaydayDisplay] = createSignal<string>(payday().toFormat('dd/MM/yyyy'));

  return (
    <div class="container mx-auto">
      <div class="text-5xl">
        <h2 class="font-bold">Next Payday</h2>
        <p class="font-semibold">{paydayDisplay()}</p>
      </div>
      <Counter paydayDate={payday()}></Counter>
      <div class="w-1/3 flex flex-col mx-auto">
        <img class="w-full mb-4" alt="meme-1" src="/img/meme1.jpg"></img>
        <img class="w-full" alt="meme-2" src="/img/meme2.jpg"></img>
      </div>

      <div>
        <label for="salaryDate">When is your payday</label>
        <input class="block" id="salaryDate" type="date"></input>
      </div>
    </div>
  );
};

export default App;