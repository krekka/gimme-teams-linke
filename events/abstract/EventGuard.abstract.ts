import { Context } from "https://deno.land/x/grammy@v1.12.0/context.ts";

export abstract class EventGuard {
    public abstract call: (ctx: Context) => boolean;
}
