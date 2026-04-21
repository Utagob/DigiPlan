const eventSection = document.getElementsByClassName("eventContainer")[0];
const addEventButton = document.getElementById("addEventButton");

class Event {
    constructor(date, description, time, index) {
        this.date = date;
        this.description = description;
        this.time = time;
        this.index = index;
    }
    setDate(date) { this.date = date; }
    setDescription(description) { this.description = description; }
    setTime(time) { this.time = time; }
    setIndex(index) { this.index = index; }

    getDate() { return this.date; }
    getDescription() { return this.description; }
    getTime() { return this.time; }
    getIndex() { return this.index; }
}

class Events {
    constructor() { this.events = []; }
    addEvent(event) { this.events.push(event); }
    removeEvent(index) {
        if (index >= 0 && index < this.events.length) {
            this.events.splice(index, 1);
        }
    }
    getEvents() { return this.events; }
}

const events = new Events();

document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
});

function loadEvents() {
    const stored = localStorage.getItem('events');
    if (stored) {
        const parsed = JSON.parse(stored);
        parsed.forEach(event => {
            addEvent(event.date, event.description, event.time);
        });
    }
    filterEventsByDate();
}

function filterEventsByDate() {
    const currentDate = localStorage.getItem('selectedDate');
    Array.from(eventSection.children).forEach(box => {
        const boxDate = box.className.split(' ')[1] || '';
        box.style.display = (boxDate === currentDate) ? '' : 'none';
    });
}

function saveEvents() {
    const updatedEvents = Array.from(eventSection.children).map(event => {
        const timeInput = event.querySelector('.eventTime');
        const descInput = event.querySelector('.eventDescription');
        const className = event.className;
        const date = className.split(' ')[1] || '';
        return {
            date: date,
            time: timeInput ? timeInput.value || '12:00' : '12:00',
            description: descInput ? descInput.value : ''
        };
    });

    localStorage.setItem('events', JSON.stringify(updatedEvents));
}

function addEvent(date, description, time) {
    const index = events.getEvents().length;
    const event = new Event(date, description, time, index);
    events.addEvent(event);

    const box = document.createElement("div");
    box.className = "event " + date + " " + index;
    eventSection.appendChild(box);

    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.className = "eventTime";
    timeInput.value = time || "00:00";
    box.appendChild(timeInput);

    const descriptionBox = document.createElement("div");
    descriptionBox.className = "eventDescriptionBox";
    box.appendChild(descriptionBox);

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.className = "eventDescription";
    descriptionInput.placeholder = "Event description";
    descriptionInput.value = description || '';
    descriptionBox.appendChild(descriptionInput);

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteEventButton";
    deleteButton.innerHTML = `<img src="images/exit.png" alt="Delete" id="deleteEvent">`;
    descriptionBox.appendChild(deleteButton);

    timeInput.addEventListener("change", () => saveEvents());
    descriptionInput.addEventListener("input", () => saveEvents());

    deleteButton.addEventListener("click", () => {
        eventSection.removeChild(box);
        events.removeEvent(index);
        saveEvents();
    });

    saveEvents();
}

addEventButton.addEventListener("click", () => {
    let currentDate = localStorage.getItem('selectedDate');
    addEvent(currentDate, "", "00:00");
    filterEventsByDate();
});