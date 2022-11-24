import { Context } from "https://deno.land/x/grammy@v1.12.0/context.ts";
import { bot } from "./bot.instance.ts";
import { BaseEvent } from "./events/abstract/BaseEvent.abstract.ts";
import * as Events from './events/index.ts';

// Initializing bot events
Object.values(Events).forEach((EventClass: any) => {
    // Creating this event class
    const event = new EventClass() as BaseEvent;

    // Adding new listener to bot
    bot.on(event.name, (ctx: Context) => {
        let isCallbackAllowed = true;

        if (event.guards) {
            event.guards.forEach((guard) => {
                if (!guard.call(ctx)) {
                    isCallbackAllowed = false;
                    return;
                }
            });
        }

        // Calling callback function
        if (isCallbackAllowed) event.callback(ctx);
    });

    // Logging
    console.log(`Initialized new event {${ event.name }}`);
});

// Starting our bot instance
bot.start();