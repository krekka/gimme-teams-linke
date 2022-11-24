import { EventGuard } from "../abstract/EventGuard.abstract.ts";
import { Context } from "https://deno.land/x/grammy@v1.12.0/context.ts";

export class GroupChatGuard implements EventGuard {
    public call(ctx: Context): boolean {
        return ctx.chat?.type == 'group';
    };
}
