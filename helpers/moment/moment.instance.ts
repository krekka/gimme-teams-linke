import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import language from './ukranian.locale.ts';

//@ts-ignore: yeah
moment.locale("uk", language);

export const Moment = moment;