//import './style.scss';
import { generateCalendar, howManyDays, getDayFirstDate, insertIntoCal, clearCalendar, resetHTML } from './calGeneration';
import { Options } from "./options";

/**
 * 
*/
export class CalEvent {
    date: Date;
    title: string;
    /**
     * @param date The date of the event
     * @param title Title of the event
     */
    constructor(date: Date, title: string) {
        this.date = date;
        this.title = title;
    }
}

export class Callib {
    private options: Options;
    private cal: Element;
    private events: Array<CalEvent>;
    private month: number;//the number of the month, Jan is 0
    constructor(location: string, month: number, options?: Options) {
        this.options = {
            width: "60em",
            selectableDates: true,
        };
        Object.assign(this.options, options);

        location = location.charAt(0) === '#' ? location.substring(1) : location;
        this.cal = document.getElementById(location);
        this.events = new Array<CalEvent>();
        this.month = month;
    }

    //TODO could be private?
    createCalendar() {
        this.setCalWidth(this.options.width, this.cal);
        this.setCalHeight("39em", this.cal);

        resetHTML(this.cal);

        let date = new Date();
        date.setMonth(this.month);
        generateCalendar(date, this.cal);

        document.getElementById("callib-month").removeEventListener("change", this.calMonthEvent.bind(this));
        document.getElementById("callib-month").addEventListener("change", this.calMonthEvent.bind(this));

        this.rerender();//TODO move rendering to seperate file to reduce concurrent logic. Should then be able to remove extra row when needed
    }

    addEvent(event: CalEvent) {
        this.events.push(event);
        this.rerender();
    }

    rerender() {
        clearCalendar(this.cal, this.month);

        for (const event of this.events) {
            if (event.date.getMonth() == this.month) {
                const eventDay = event.date.getDate();
                const shift = getDayFirstDate(event.date) - 1;
                const row = Math.floor((eventDay + shift) / 7);
                const col = Math.floor((eventDay + shift) % 7);

                insertIntoCal(this.cal, row, col, "<div class='content'" + event.title + "</div>");
            }
        }
    }

    setCalWidth(width: string, cal: Element) {
        let calWidth = this.getPixels(width, cal);

        document.documentElement.style
            .setProperty('--callib-width', calWidth + 'px');
    }

    setCalHeight(height: string, cal: Element) {
        let calHeight = this.getPixels(height, cal);

        document.documentElement.style
            .setProperty('--callib-height', calHeight + 'px');
    }

    calMonthEvent() {
        let el: HTMLSelectElement = <HTMLSelectElement>document.getElementById("callib-month");
        let val = el.value;
        const months = {
            'Jan': 0,
            'Feb': 1,
            'Mar': 2,
            'Apr': 3,
            'May': 4,
            'Jun': 5,
            'Jul': 6,
            'Aug': 7,
            'Sep': 8,
            'Oct': 9,
            'Nov': 10,
            'Dec': 11
        }
        this.month = months[val];
        this.rerender();
    }

    private getPixels(input: string, el: Element): number {
        let pixels: number;
        if (input.indexOf("em") > 0) {
            let fontSize = parseFloat(getComputedStyle(el).fontSize);
            pixels = fontSize * parseFloat(input.substring(0, input.indexOf("em")));
        } else {
            pixels = parseInt(input);
        }
        return pixels;
    }
}

