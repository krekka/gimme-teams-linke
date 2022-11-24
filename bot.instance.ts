import { Bot } from "https://deno.land/x/grammy@v1.12.0/mod.ts";
import { env } from "./config/env.ts";

// Checking if we have BOT_TOKEN property in env variables
if (!env['BOT_TOKEN']) {
    throw new Error("BOT_TOKEN env variable is not set");
};

export const bot = new Bot(env['BOT_TOKEN']);