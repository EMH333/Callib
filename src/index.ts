import './style.scss';
import 'normalize.css';
import { generateCalendar, howManyDays, getDayFirstDate, insertIntoCal } from './dateGeneration';

export class CalEvent {
    date: Date;
    title: string;
    constructor(date: Date, title: string) {
        this.date = date;
        this.title = title;
    }
}

let events = new Array<CalEvent>();
let cal: Element;

export function createCalendar(location: string, width: string) {
    location = location.charAt(0) === '#'? location.substring(1):location;
    cal = document.getElementById(location);

    setCalWidth(width, cal);
    setCalHeight("39em", cal);

    cal.innerHTML = `
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

    for(let r = 0; r < 6; r++){
        cal.lastElementChild.innerHTML += `
        <tr id="callib-r`+r +`">
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
    
    generateCalendar(new Date(), cal);
}

export function addEvent(event:CalEvent) {
    events.push(event);

    const eventDay = event.date.getDate();
    const shift = getDayFirstDate(event.date);
    const row = Math.floor((eventDay + shift) / 7);
    const col = Math.floor((eventDay + shift) % 7);

    insertIntoCal(cal, row, col, "<div class='content'"+event.title+"</div>");
}

function setCalWidth(width:string, cal: Element){
    let calWidth = getPixels(width, cal);

    document.documentElement.style
    .setProperty('--callib-width', calWidth+'px');
}

function setCalHeight(height:string, cal: Element){
    let calHeight = getPixels(height, cal);

    document.documentElement.style
    .setProperty('--callib-height', calHeight+'px');
}

function getPixels(input:string, el: Element):number{
    let pixels: number;
    if(input.indexOf("em")>0){
        let fontSize = parseFloat(getComputedStyle(el).fontSize);
        pixels = fontSize * parseFloat(input.substring(0,input.indexOf("em")));
    }else{
        pixels = parseInt(input);
    }
    return pixels;
}