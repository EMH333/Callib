export function generateCalendar(d: Date, el: Element) {
    var days = howManyDays(d);
    var shift = getDayFirstDate(d);
    for (var i = 0; i < days; i++) {
        var posi_row = Math.floor((i + shift) / 7);
        var posi_col = Math.floor((i + shift) % 7);
        var currentDate = i + 1;
        insertIntoCal(el,posi_row,posi_col,generateHTML(currentDate));
    }
}

export function insertIntoCal(el: Element, row:number,col:number,html:string){
    el.querySelector('#callib-r' + row).querySelector('.col' + col).innerHTML += html;
}

function generateHTML(currentDate: number):string {
    return `<span class='callib-date-display'>` + currentDate + `</span>`;
}

export function getDayFirstDate(d: Date) {
    var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    return firstDay.getDay();
}

export function howManyDays(d: Date) {
    var m = d.getMonth() + 1;
    if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) return 31;
    if (m == 2) {
        if (isLeapYear(d.getFullYear())) {
            return 29;
        } else {
            return 28;
        }
    }
    return 30;
}

function isLeapYear(year: number) {
    if (year % 400 == 0) {
        return true;
    } else if (year % 100 == 0) {
        return false;
    } else if (year % 4 == 0) {
        return true;
    } else {
        return false;
    }
}