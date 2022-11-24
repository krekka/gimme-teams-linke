import { Context } from "https://deno.land/x/grammy@v1.12.0/context.ts";
import { EventGuard } from "../abstract/EventGuard.abstract.ts";

export class ExactGroupChatGruad implements EventGuard {
    constructor(
        public groupId: number | Array<number>
    ) {}

    public call(ctx: Context): boolean {
        if (ctx.chat?.id) {
            if (Array.isArray(this.groupId) && this.groupId.includes(ctx.chat.id)) {
                return true;
            }

            if (typeof this.groupId == "number" && ctx.chat.id == this.groupId) {
                return true;
            }
        }

        return false;
    }
}
