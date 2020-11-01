export function generateCalendar(d: Date, el: Element) {
    let days = howManyDays(d);
    let shift = getDayFirstDate(d);
    for (let i = 0; i < days; i++) {
        let posi_row = Math.floor((i + shift) / 7);
        let posi_col = Math.floor((i + shift) % 7);
        let currentDate = i + 1;
        insertIntoCal(el, posi_row, posi_col, generateHTML(currentDate));
    }

    let max_row = Math.floor((days + shift) / 7);
}

export function insertIntoCal(el: Element, row: number, col: number, html: string) {
    el.querySelector('#callib-r' + row).querySelector('.col' + col).innerHTML += html;
}

function clearFromCell(el: Element, row: number, col: number) {
    el.querySelector('#callib-r' + row).querySelector('.col' + col).innerHTML = "";
}

export function clearCalendar(el: Element, month: number) {
    let d = new Date();
    d.setDate(1);
    d.setMonth(month);

    let days = howManyDays(d);
    let shift = getDayFirstDate(d);

    //clear whole calendar
    //TODO remove constant of 42
    //change to use correctly value depending on rows
    for (let i = 0; i < 42; i++) {
        let row = Math.floor(i / 7);
        let col = Math.floor(i % 7);
        clearFromCell(el, row, col);
    }

    for (var i = 0; i < days; i++) {
        var posi_row = Math.floor((i + shift) / 7);
        var posi_col = Math.floor((i + shift) % 7);
        var currentDate = i + 1;

        //clearFromCell(el, posi_row, posi_col);
        insertIntoCal(el, posi_row, posi_col, generateHTML(currentDate));
    }
}

function generateHTML(currentDate: number): string {
    return `<span class='callib-date-display'>` + currentDate + `</span>`;
}

export function getDayFirstDate(d: Date) {
    var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    return firstDay.getDay();
}

export function howManyDays(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function resetHTML(el: Element) {
    el.innerHTML = `
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
        el.innerHTML += `
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
}