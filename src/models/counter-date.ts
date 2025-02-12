import { DateTime } from "luxon";

export interface CounterDates {
    paydayDate: DateTime<boolean> | null;
}
