//Class
class Pair {
    constructor(value1, value2) {
        this.value1 = value1;
        this.value2 = value2;
    }
}
//Variables
let mIndexTemp = -1;
let dayIndex = 0;
let isBurgerPressed;
let calMenuSwitch = true;
let today = new Date();
let mt = new moment(today);
let mtCal = moment.apply();
let events;
//Selectors
const sidebarEl = $(".sidebar");
const schedulerEl = $(".scheduler");
const burgerMenuEl = $("#burger");
const headerLeftDateEl = $("#headerLeftDate");
const headerDateUpEl = $("#up");
const headerDateDownEl = $("#down");
const calEl = $(".cal");
const calendarCardEls = [
    new Pair($(".cal-january"), false),
    new Pair($(".cal-february"), false),
    new Pair($(".cal-march"), false),
    new Pair($(".cal-april"), false),
    new Pair($(".cal-may"), false),
    new Pair($(".cal-june"), false),
    new Pair($(".cal-july"), false),
    new Pair($(".cal-august"), false),
    new Pair($(".cal-september"), false),
    new Pair($(".cal-october"), false),
    new Pair($(".cal-november"), false),
    new Pair($(".cal-december"), false),
];
const headerRightDateEl = $("#headerRightDate");
const headerDayLeftEl = $("#left");
const headerDayRightEl = $("#right");
const headerTodayEl = $("#today");
const dayTextEl = $("#dayText");
const dayNumberEl = $("#dayNumber");
const eventsBackgroundEl = $(".events .background");
const eventsContainerEl = $("#eventsContainer");

//Events
burgerMenuEl.click(burgerMenu);

let isPressed = false;
calEl.click((e) => {
    if (isPressed) return;
    isPressed = true;
    calendarCards(e);
    setTimeout(function () {
        isPressed = false;
    }, 1000);
});
//Change

headerDateUpEl.click(() => {
    if (isPressed) return;
    isPressed = true;
    headerDateUp();
    setTimeout(function () {
        isPressed = false;
    }, 1000);
});
let isDown = false;
headerDateDownEl.click(() => {
    if (isPressed) return;
    isPressed = true;
    headerDateDown();
    setTimeout(function () {
        isPressed = false;
    }, 1000);
});
headerDayLeftEl.click(headerDayLeft);
headerDayRightEl.click(headerDayRight);
headerTodayEl.click(() => {
    if (isPressed) return;
    isPressed = true;
    headerToday();
    setTimeout(function () {
        isPressed = false;
    }, 1000);
});

eventsContainerEl.keyup(onEventInputChange);
//Functions
//====================Init====================
init();
function init() {
    let mIndex = parseInt(mt.format("M"));
    openCalenderTabs(mIndex - 1);
    showMonthInMenu();
    switchCalendarBackground(mIndex - 1);

    dayIndex = parseInt(mt.format("d"));
    showEventDay();
    //Create events
    events = new Events(eventsContainerEl);
    events.pull(); // pull all events
    events.expired(); //check if expired events

    //Create calendar
    initCalendar(() => {
        //Number selector callback
        events.pull();
        events.expired();
    });
}
//====================Menu====================
function burgerMenu() {
    let line1 = burgerMenuEl.children(".line1");
    let line2 = burgerMenuEl.children(".line2");
    let line3 = burgerMenuEl.children(".line3");

    if ((isBurgerPressed = !isBurgerPressed)) {
        line1.addClass("toggle");
        line2.addClass("toggle");
        line3.addClass("toggle");
        minimizeMenu();
    } else {
        line1.removeClass("toggle");
        line2.removeClass("toggle");
        line3.removeClass("toggle");
        maximizeMenu();
    }
}

function minimizeMenu() {
    sidebarEl.addClass("toggle");
    schedulerEl.addClass("toggle");
}

function maximizeMenu() {
    sidebarEl.removeClass("toggle");
    schedulerEl.removeClass("toggle");
}

function calendarCards(e) {
    mt.set("M", parseInt($(e.target).data("index")));
    let mIndex = parseInt(mt.format("M"));
    mIndexTemp = mIndex;
    openCalenderTabs(mIndex - 1);
    setCalendar(mIndex - 1);
    showMonthInMenu();
    switchCalendarBackground(mIndex - 1);
    events.pull(); // pull all events
    events.expired(); //check if expired events
}

function openCalenderTabs(index) {
    calendarCardEls.forEach((el) => {
        if (el.value2) {
            let top = parseInt($(el.value1).css("top")) - 180;
            $(el.value1).css("top", top + "px");
            el.value2 = false;
        }
    });
    let timeOut = parseFloat(calEl.css("transition-duration"));

    setTimeout(function () {
        for (let i = index + 1; i < calendarCardEls.length; i++) {
            let pair = calendarCardEls[i];
            let top = parseInt($(pair.value1).css("top")) + 180;
            $(pair.value1).css("top", top + "px");
            pair.value2 = true;
        }
    }, timeOut * 1000);
}

function headerDateUp() {
    mt.subtract(1, "M");
    headerDateUpDown();
}

function headerDateDown() {
    mt.add(1, "M");
    headerDateUpDown();
}

function headerDateUpDown() {
    let mIndex = parseInt(mt.format("M"));
    openCalenderTabs(mIndex - 1);
    setCalendar(mIndex - 1);
    showMonthInMenu();
    switchCalendarBackground(mIndex - 1);
    events.pull(); // pull all events
    events.expired(); //check if expired events
}

function headerDayLeft() {
    mt.subtract(1, "d");
    headerDayLeftRight();
}

function headerDayRight() {
    mt.add(1, "d");
    headerDayLeftRight();
}

function headerDayLeftRight() {
    showEventDay();
    showMonthInMenu();
    let mIndex = parseInt(mt.format("M"));
    //Filter if month is the same
    if (mIndex !== mIndexTemp) {
        openCalenderTabs(mIndex - 1);
        setCalendar(mIndex - 1);
        switchCalendarBackground(mIndex - 1);
        mIndexTemp = mIndex;
    }
    events.pull(); // pull all events
    events.expired(); //check if expired events
}

function headerToday() {
    mt.date(today.getUTCDate());
    mt.year(today.getUTCFullYear());
    mt.month(today.getUTCMonth());
    let mIndex = parseInt(mt.format("M"));
    openCalenderTabs(mIndex - 1);
    setCalendar(mIndex - 1);
    showMonthInMenu();
    showEventDay();
    switchCalendarBackground(mIndex - 1);
    events.pull(); // pull all events
    events.expired(); //check if expired events
}

function switchCalendarBackground(index) {
    let img = "";
    switch (index) {
        case 0:
            img = "img/max/january.png";
            break;
        case 1:
            img = "img/max/february.png";
            break;
        case 2:
            img = "img/max/march.png";
            break;
        case 3:
            img = "img/max/april.png";
            break;
        case 4:
            img = "img/max/may.png";
            break;
        case 5:
            img = "img/max/june.png";
            break;
        case 6:
            img = "img/max/july.png";
            break;
        case 7:
            img = "img/max/august.png";
            break;
        case 8:
            img = "img/max/september.png";
            break;
        case 9:
            img = "img/max/october.png";
            break;
        case 10:
            img = "img/max/november.png";
            break;
        case 11:
            img = "img/max/december.png";
            break;
    }
    eventsBackgroundEl.css("background-image", " url(" + img + ")");
}

function showMonthInMenu() {
    headerLeftDateEl.text(mt.format("MMMM YYYY"));
    headerRightDateEl.text(mt.format("MMMM YYYY"));
}

function showEventDay() {
    dayTextEl.text(mt.format("dddd"));
    dayNumberEl.text(mt.format("D"));
}

//Event Input Change
function onEventInputChange(e) {
    const event = {
        year: mt.year(),
        month: mt.month(),
        date: mt.date(),
        eventIndex: $(e.target.parentNode).data("index"),
        event: $(e.target).val(),
    };
    events.save(event);
}

//====================Calendar====================
//Create calendar
function initCalendar(callback) {
    calendarCardEls.forEach((el) => {
        let c = el.value1.find(".calendar");
        let dataIndex = el.value1.data("index");

        new Calendar(c, dataIndex, callback);
    });
}

function setCalendar(index, callback) {
    let element = calendarCardEls[index];
    let c = element.value1.find(".calendar");
    let dataIndex = element.value1.data("index");

    return new Calendar(c, dataIndex, callback);
}

function Calendar(elem, index, callback) {
    mtCal.set("year", mt.year());
    mtCal.set("month", mt.month());
    mtCal.set("date", mt.date());
    let monthIndex = mtCal.month(index);
    let first = monthIndex.date(1);

    let sun = "<li class='calDays'><span>Sun</span></li>";
    let mon = "<li class='calDays'><span>Mon</span></li>";
    let tue = "<li class='calDays'><span>Tue</span></li>";
    let wed = "<li class='calDays'><span>Wed</span></li>";
    let thu = "<li class='calDays'><span>Thu</span></li>";
    let fri = "<li class='calDays'><span>Fri</span></li>";
    let sat = "<li class='calDays'><span>Sat</span></li>";

    function setDayNames() {
        elem.append(sun);
        elem.append(mon);
        elem.append(tue);
        elem.append(wed);
        elem.append(thu);
        elem.append(fri);
        elem.append(sat);
    }

    function createDay(num) {
        let element = $(
            `<li><span data-month=${monthIndex.format("M")}>${num}</span></li>`
        );
        return element;
    }

    function addDay(num) {
        let element = createDay(num);

        if (num === 1) {
            element.addClass("offset-" + first.day());
        }
        if (num === today.getUTCDate() && index === today.getUTCMonth()) {
            element.addClass("today");
        }
        elem.append(element);
    }

    function deselect(li) {
        if (!li) return;
        $("li").removeClass("selected");
    }

    function select(li) {
        deselect(elem.find(".selected"));
        $(li).addClass("selected");
    }
    //Calendar Event Listener
    elem.click(onDayClick);

    function onDayClick(e) {
        e.stopPropagation();
        select(e.target.parentNode);

        let month = parseInt($(e.target).data("month")) - 1;
        let day = parseInt($(e.target).text());

        if (!Number.isNaN(month) && day) {
            mt.set("month", month);
            mt.set("date", day);
            showMonthInMenu();
            showEventDay();
        }
        if (callback) {
            callback();
        }
    }
    //Clear all calendar elements
    elem.empty();
    // Set days name
    setDayNames();
    //Add days to calendar
    for (let i = 1, days = monthIndex.daysInMonth(); i <= days; i++) {
        addDay(i);
    }
}
//====================Events====================
//Create Event List
function Events(elem) {
    const dt = new Date(1970, 0, 1);

    function createEvent(time, index) {
        let element = $(
            `<div class="event-container flex">` +
                `<div class="event-indicator"></div>` +
                `<div class="time">${time}</div>` +
                `<div data-index="${index}" class="event">
                <input type="text" placeholder="Add task" name="task">
                </div>` +
                `</div>`
        );
        return element;
    }

    function addEvent(time, index) {
        let element = createEvent(time, index);
        elem.append(element);
    }

    //Local Storage
    this.save = (data) => {
        if (data.year && data.month && data.date && data.eventIndex) {
            localStorage.setItem(
                `${data.year}-${data.month}-${data.date}-${data.eventIndex}`,
                data.event
            );
        }
    };

    this.pull = () => {
        let inputs = $(".event input");
        inputs.val(""); // clear all inputs

        for (let i = 0; i < inputs.length; i++) {
            const element = inputs[i];
            //Get elements from storage
            let data = localStorage.getItem(
                `${mt.year()}-${mt.month()}-${mt.date()}-${i + 1}`
            );
            //Get data-index from event element
            let index = $(element.parentNode).data("index");
            if (index === i + 1) {
                $(element).val(data); // restore data to task
            }
        }
    };

    this.expired = () => {
        let eventIndicator = eventsContainerEl.find(".event-indicator");
        eventIndicator
            .removeClass("expired")
            .removeClass("now")
            .removeClass("future");

        const dt = new Date(1970, 0, 1);
        let hourNow = today.getHours();

        let i = 0;
        while (dt.getDate() === 1) {
            let hourIndex = dt.getHours();
            dt.setHours(dt.getHours() + 1);
            const element = $(eventIndicator[i++]);

            let mainCalWrap = new Date(mt.year(), mt.month(), mt.date());
            let todayCalWrap = new Date(
                today.getUTCFullYear(),
                today.getUTCMonth(),
                today.getUTCDate()
            );

            //Today
            if (mainCalWrap.getTime() === todayCalWrap.getTime()) {
                if (hourIndex === hourNow) {
                    element.addClass("now");
                } else if (hourIndex < hourNow) {
                    element.addClass("expired");
                } else if (hourIndex > hourNow) {
                    element.addClass("future");
                }
            }
            //Future
            if (mainCalWrap.getTime() > todayCalWrap.getTime()) {
                element.addClass("future");
            }
            //Expired
            if (mainCalWrap.getTime() < todayCalWrap.getTime()) {
                element.addClass("expired");
            }
        }
    };

    //Add events to event container
    let i = 1;
    while (dt.getDate() === 1) {
        addEvent(dt.toLocaleTimeString([], { timeStyle: "short" }), i++);
        dt.setHours(dt.getHours() + 1);
    }
}
