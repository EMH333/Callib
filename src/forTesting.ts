import {Callib, CalEvent} from "./index";

let cal;
document.addEventListener('DOMContentLoaded', function () {
    let date = new Date();
    //date.setMonth(3);

    cal = new Callib("#cal", date.getMonth());
    cal.createCalendar("60em");
    //document.cal = cal;

    cal.addEvent(new CalEvent(date, "<span>aaaaaaa</span>"));
    cal.addEvent(new CalEvent(date, "<span>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</span>"));

    let thirdy = new Date(date);
    thirdy.setDate(30);
    cal.addEvent(new CalEvent(thirdy, "<span>30th</span>"));
}, false);