import './style.scss';
import 'normalize.css';
import { generateCalendar } from './dateGeneration';

export function createCalendar(location: string, width: string) {
    location = location.charAt(0) === '#'? location.substring(1):location;
    let cal = document.getElementById(location);

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