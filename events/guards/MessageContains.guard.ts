import { EventGuard } from "../abstract/EventGuard.abstract.ts";
import { Context } from "https://deno.land/x/grammy@v1.12.0/context.ts";

export class MessageContainsGuard implements EventGuard {
    constructor(
        private regex: RegExp,
    ) {}
    
    public call(ctx: Context): boolean {
        if (!ctx.message?.text) return false;
        return this.regex.test(ctx.message?.text);
    }
}
