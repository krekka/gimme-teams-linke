import { Context } from "https://deno.land/x/grammy@v1.12.0/context.ts";
import { FilterQuery } from "https://deno.land/x/grammy@v1.12.0/filter.ts";
import { time, timezone } from "https://deno.land/x/time.ts/mod.ts";
import { chats, ILessonLink } from "../config/chats.ts";
import { escapeCharacters } from "../helpers/escapeCharacters.ts";
import { parseRepeatableDate } from "../helpers/repeatableDate.ts";
import { BaseEvent } from "./abstract/BaseEvent.abstract.ts";
import { EventGuard } from "./abstract/EventGuard.abstract.ts";
import { ExactGroupChatGruad } from "./guards/ExactGroupChat.guard.ts";
import { GroupChatGuard } from "./guards/GroupChat.guard.ts";
import { MessageContainsGuard } from "./guards/MessageContains.guard.ts";
import { Moment } from "../helpers/moment/moment.instance.ts";

console.log(timezone.filter((tz) => tz.text.includes("GMT+2")));

export class OnMessageEvent implements BaseEvent {
    public name: FilterQuery = "message";
    public guards: EventGuard[] = [
        new GroupChatGuard(),
        new ExactGroupChatGruad(chats.map((chat) => chat.chatId)),
        new MessageContainsGuard(/(киньте|скиньте|скиньте|киньте)[\s]+(посилання|ссилку|ссылку|линк)/gi),
    ];

    public callback(ctx: Context) {
        // Getting teams links info for this group chat
        const chat = chats.find((chat) => chat.chatId == ctx.chat?.id);
        if (!chat) return;

        const { lessons } = chat;
        const now = time().tz("Etc/GMT+2").t;

        // Looping thourg lessons and finding
        const appliableLessons = lessons.filter((lesson) => {
            const startTime = parseRepeatableDate(lesson.startTime);
            const endTime = parseRepeatableDate(lesson.endTime);

            // Offsetting start time by 1 hour
            startTime.setHours(startTime.getHours() - 1);

            if (now >= startTime && now <= endTime) {
                return true;
            }

            return false;
        });

        // Sending this information to chat
        if (appliableLessons.length == 0) {
            // No lessons found
            ctx.reply("Нажаль, я не зміг знайти пари на данний час.");
        } else if (appliableLessons.length == 1) {
            // Exactly one
            ctx.reply("Я зміг знайти рівно одне посилання на пару, яка йде прямо зараз!");

            // Sending
            this._sendLesson(ctx, appliableLessons[0]);
        } else {
            // More than one lesson
            ctx.reply(`Я зміг знайти ${ appliableLessons.length } пар, які йдуть прямо зараз!`);
            
            // Sending
            appliableLessons.forEach((lesson) => this._sendLesson(ctx, lesson));
        }
    }

    private _sendLesson(ctx: Context, lesson: ILessonLink) {
        // Parsing dates
        const startTime = Moment((parseRepeatableDate(lesson.startTime)));
        const endTime = Moment(parseRepeatableDate(lesson.endTime));
        
        ctx.reply(escapeCharacters(`
            ${ lesson.title }
            \n_Початок пари:_ \n*${ startTime.fromNow() }* _\\(${ startTime.format("dddd, HH:mm") }\\)_
            \n_Кінець пари:_ \n*${ endTime.fromNow() }* _\\(${ endTime.format("dddd, HH:mm") }\\)_
            \n[Посилання](${ lesson.link })
        `), {
            parse_mode: "MarkdownV2",
            disable_notification: true,
            disable_web_page_preview: true
        });
    }
}
