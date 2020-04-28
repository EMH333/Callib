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

function clearFromCell(el: Element, row:number,col:number){
    el.querySelector('#callib-r' + row).querySelector('.col' + col).innerHTML = "";
}

export function clearCalendar(el: Element, month: number){
    let d = new Date();
    d.setDate(1);
    d.setMonth(month);
    
    let days = howManyDays(d);
    let shift = getDayFirstDate(d);

    //clear whole calendar
    //TODO remove constant of 42
    //change to use correctly value depending on rows
    for(let i = 0; i < 42; i++){
        let row = Math.floor(i / 7);
        let col = Math.floor(i % 7);
        clearFromCell(el, row,col);
    }

    for (var i = 0; i < days; i++) {
        var posi_row = Math.floor((i + shift) / 7);
        var posi_col = Math.floor((i + shift) % 7);
        var currentDate = i + 1;

        clearFromCell(el, posi_row,posi_col);
        insertIntoCal(el,posi_row,posi_col,generateHTML(currentDate));
    }
}

function generateHTML(currentDate: number):string {
    return `<span class='callib-date-display'>` + currentDate + `</span>`;
}

export function getDayFirstDate(d: Date) {
    var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    return firstDay.getDay();
}

export function howManyDays(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}