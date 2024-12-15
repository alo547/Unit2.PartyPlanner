const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2410-ftb-et-web-pt/events`;

// add api url in a varible so i can remove the link multiple times

// add input logic logic that prevents users ability to click add event with no details

// I am having issues getting the new event to being added to the list

function addEvent(name, description, date, location) {
    const newEvent = { name, description, date: new Date(date), location };
console.log(newEvent)

    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2410-ftb-et-web-pt/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add event');
        }
        return response.json();
    })
    .then(event => {
    fetchEvents();
    renderEvents();
})
    .catch(error => {
        console.error('Error adding event:', error);
    });
}


fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2410-ftb-et-web-pt/events', {
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(addEvent),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Failed to add event');
    }
    return response.json();
})
.then(newEvent => {
events.push(newEvent);
renderEvents();
})
.catch(error => {
    console.error('Error adding event:', error);
});
// make a delete request to the API




let events = []; // this will be the array that will store my events

const form = document.querySelector('#addEvent');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = e.target.eventName.value;
    const description = e.target.description.value;
    const date = e.target.eventDate.value;
    const location = e.target.eventLocation.value;

    addEvent(name, description, date, location);

    form.reset();

});

function renderEvents() {
    const partiesList = document.querySelector('#parties');
    partiesList.innerHTML = '';

    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.textContent = `${event.name}, ${event.description}, ${event.date}, ${event.location}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
           await deleteEvent(event.id);
        });

        li.appendChild(deleteButton);
        partiesList.appendChild(li);
    });
}

async function deleteEvent(id) {
    await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2410-ftb-et-web-pt/events/${id}`, {
        method: 'DELETE',
    })
    fetchEvents();
    renderEvents();
}

function fetchEvents() {
    fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2410-ftb-et-web-pt/events`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        events = data.data;
        renderEvents();
    })
    .catch(error => {
        console.error('Error fetching events:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});