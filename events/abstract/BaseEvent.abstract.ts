import { Context } from "https://deno.land/x/grammy@v1.12.0/context.ts";
import { FilterQuery } from "https://deno.land/x/grammy@v1.12.0/filter.ts";
import { EventGuard } from './EventGuard.abstract.ts';

export abstract class BaseEvent {
    public abstract name: FilterQuery;
    public abstract guards?: Array<EventGuard>;
    public abstract callback: (ctx: Context) => void;
}
