import { getRepeatableDate } from "../helpers/repeatableDate.ts";

export interface IChat {
    chatId: number;
    lessons: Array<ILessonLink>;
}

export interface ILessonLink {
    startTime: string;
    endTime: string;

    title: string;
    link: string;
}

// todo
// move to env variable
// 1 = tuesday
export const chats: Array<IChat> = [
    {
        chatId: -830595378,
        lessons: [
            // Monday
            {
                title: "Чисельні методи",
                startTime: getRepeatableDate(0, 14, 30),
                endTime: getRepeatableDate(0, 17, 20),
                link: "https://google.com",
            },

            // Tuesday
            {
                title: "Веб-технології та веб-дизайн (Лекція)",
                startTime: getRepeatableDate(1, 10, 0),
                endTime: getRepeatableDate(1, 11, 20),
                link: "https://google.com",
            },
            {
                title: "Веб-технології та веб-дизайн (Лаб. перша група)",
                startTime: getRepeatableDate(1, 11, 40),
                endTime: getRepeatableDate(1, 13, 0),
                link: "https://google.com",
            },
            {
                title: "Веб-технології та веб-дизайн (Лаб. друга група)",
                startTime: getRepeatableDate(1, 13, 5),
                endTime: getRepeatableDate(1, 14, 25),
                link: "https://google.com",
            },

            // Wednesday
            {
                title: "Організація баз даних та знань (Лекція)",
                startTime: getRepeatableDate(2, 13, 5),
                endTime: getRepeatableDate(2, 14, 25),
                link: "https://google.com",
            },
            {
                title: "Організація баз даних та знань (Лаб.)",
                startTime: getRepeatableDate(2, 14, 30),
                endTime: getRepeatableDate(2, 15, 50),
                link: "https://google.com",
            },

            // Thursday
            {
                title: "Теорія ймовірностей та математична статистика",
                startTime: getRepeatableDate(3, 10, 0),
                endTime: getRepeatableDate(3, 15, 50),
                link: "https://google.com",
            },
            {
                title: "Методи дослідження операцій",
                startTime: getRepeatableDate(3, 16, 0),
                endTime: getRepeatableDate(3, 18, 50),
                link: "https://google.com",
            },

            // Friday
            {
                title: "Об'єктно орієнтоване програмування",
                startTime: getRepeatableDate(4, 11, 40),
                endTime: getRepeatableDate(4, 14, 25),
                link: "https://google.com",
            }
        ]
    }
]