import { Bot } from "https://deno.land/x/grammy@v1.12.0/mod.ts";

// Checking if we have BOT_TOKEN property in env variables
if (!Deno.env.get('BOT_TOKEN')) {
    throw new Error("BOT_TOKEN env variable is not set");
};

export const bot = new Bot(Deno.env.get('BOT_TOKEN'));