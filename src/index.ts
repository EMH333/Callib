import './style.scss';
import 'normalize.css';
import { generateCalendar, howManyDays, getDayFirstDate, insertIntoCal, clearCalendar } from './dateGeneration';

export class CalEvent {
    date: Date;
    title: string;
    constructor(date: Date, title: string) {
        this.date = date;
        this.title = title;
    }
}

export class Callib {
    cal: Element;
    events: Array<CalEvent>;
    month: number;//the number of the month, Jan is 0
    constructor(location: string, month: number) {
        location = location.charAt(0) === '#' ? location.substring(1) : location;
        this.cal = document.getElementById(location);
        this.events = new Array<CalEvent>();
        this.month = month;
    }

    createCalendar(width: string) {
        this.setCalWidth(width, this.cal);
        this.setCalHeight("39em", this.cal);

        this.cal.innerHTML = `
        <table class="callib">
        <tr class="callib-label">
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wendesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
        </tr>
        </table>
        `;

        for (let r = 0; r < 6; r++) {
            this.cal.lastElementChild.innerHTML += `
            <tr id="callib-r`+ r + `">
                <td class="col0 callib-date"></td>
                <td class="col1 callib-date"></td>
                <td class="col2 callib-date"></td>
                <td class="col3 callib-date"></td>
                <td class="col4 callib-date"></td>
                <td class="col5 callib-date"></td>
                <td class="col6 callib-date"></td>
            </tr>
            `;
        }

        let date = new Date();
        date.setMonth(this.month);
        generateCalendar(date, this.cal);
    }

    addEvent(event: CalEvent) {
        this.events.push(event);
        this.reRender();
    }

    reRender(){
        clearCalendar(this.cal, this.month);

        for(const event of this.events){
            if(event.date.getMonth() == this.month){
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

