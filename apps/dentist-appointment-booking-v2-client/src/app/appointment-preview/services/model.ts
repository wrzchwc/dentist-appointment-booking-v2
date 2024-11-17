import { DateObjectUnits } from 'luxon';

export const DAY_START: DateObjectUnits = { hour: 0, minute: 0, second: 0, millisecond: 0 };

export const WORKDAY_END = { hour: 17, minute: 0, second: 0, millisecond: 0 };

export const DAY_END: DateObjectUnits = { hour: 23, minute: 59, second: 59, millisecond: 999 };
