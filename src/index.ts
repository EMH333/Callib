import './style.scss';
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
    private cal: Element;
    private events: Array<CalEvent>;
    private month: number;//the number of the month, Jan is 0
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
        <div>
            <select name="month" id="callib-month">
                <option value="Jan">January</option>
                <option value="Feb">Febuary</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
            </select>
        </div>
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

        document.getElementById("callib-month").addEventListener("change",this.calMonthEvent.bind(this));
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

    calMonthEvent(){
        let el:HTMLSelectElement = <HTMLSelectElement>document.getElementById("callib-month");
        let val = el.value;
        const months = {
            'Jan' : 0,
            'Feb' : 1,
            'Mar' : 2,
            'Apr' : 3,
            'May' : 4,
            'Jun' : 5,
            'Jul' : 6,
            'Aug' : 7,
            'Sep' : 8,
            'Oct' : 9,
            'Nov' : 10,
            'Dec' : 11
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

