import './css/styles.css';
import Traveler from '../src/traveler';
import { getAPIData } from './apiCalls';
import * as dayjs from 'dayjs';

let currentTraveler;
let travelers;
let trips;
let destinations;
const currentDate = new Date();
const currentYear = currentDate.getFullYear().toString();

const logInButton = document.getElementById('logInButton');
const logInPage = document.querySelector('.logInPage');
const mainPage = document.querySelector('main');
const header = document.querySelector('header');
const usernameBox = document.getElementById('usernameBox');
const passwordBox = document.getElementById('passwordBox');
const errorMessage = document.getElementById('errorMessage');
const approvedTripList = document.getElementById('approvedTripList');
const pendingTripList = document.getElementById('pendingTripList');
const totalSpent = document.getElementById('totalSpent');
const destinationSelector = document.getElementById('destinationSelector');
const bookButton = document.getElementById('bookButton');
const dateBox = document.getElementById('dateBox');
const daysBox = document.getElementById('daysBox');
const travelersBox = document.getElementById('travelersBox');
const dateDisplay = document.getElementById('dateDisplay');
const tripCost = document.getElementById('tripCost');
const nameDisplay = document.getElementById('nameDisplay');
document.getElementById('dateBox').setAttribute('min', new Date().toISOString().split('T')[0]);

window.addEventListener('load', displayDateAndDestinations)
logInButton.addEventListener('click', logIn)
bookButton.addEventListener('click', bookTrip)

setInterval(displayTripCost, 300)

function displayDateAndDestinations() {
    dateDisplay.innerText = currentDate.toLocaleDateString();
    Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
        .then((data) => {
            travelers = data[0]
            trips = data[1]
            destinations = data[2]
            destinations.destinations.forEach(destination => {
                destinationSelector.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
            })
        })
        .catch(err => console.log('To err is human', err))
}

function displayTripCost() {
    if (dateBox.value && daysBox.value > 0 && travelersBox.value > 0 && destinationSelector.value != 0) {
        const selectedDate = dateBox.value;
        const splitDate = selectedDate.split('-')
        const formattedDate = `${splitDate[0]}/${splitDate[1]}/${splitDate[2]}`;
        const correctDestination = destinations.destinations.find(destination => destination.destination === destinationSelector.value)
        const lastTrip = trips.trips.at(-1);
        const newTrip = {
            id: lastTrip.id + 1,
            userID: currentTraveler.id,
            destinationID: correctDestination.id,
            travelers: travelersBox.value,
            date: formattedDate,
            duration: daysBox.value,
            status: "pending",
            suggestedActivities: []
        }
        tripCost.innerText = `This trip will cost approximately $${calculateTripCost(newTrip, correctDestination)}`
    } else {
        tripCost.innerText = ''
    }
}

function calculateTripCost(trip, destination) {
    const abc = trip.travelers * destination.estimatedFlightCostPerPerson
    const def = trip.duration * destination.estimatedLodgingCostPerDay
    const beforeFee = abc + def;
    const afterFee = Number((beforeFee * 1.1).toFixed(0));
    return afterFee
}

function bookTrip() {
    if (dateBox.value && daysBox.value > 0 && travelersBox.value > 0 && destinationSelector.value != 0) {
        const selectedDate = dateBox.value;
        const splitDate = selectedDate.split('-')
        const formattedDate = `${splitDate[0]}/${splitDate[1]}/${splitDate[2]}`;
        const correctDestination = destinations.destinations.find(destination => destination.destination === destinationSelector.value)
        const lastTrip = trips.trips.at(-1);
        const newTrip = {
            id: lastTrip.id + 1,
            userID: currentTraveler.id,
            destinationID: correctDestination.id,
            travelers: travelersBox.value,
            date: formattedDate,
            duration: daysBox.value,
            status: "pending",
            suggestedActivities: []
        }
        fetch('http://localhost:3001/api/v1/trips', {
            method: 'POST',
            body: JSON.stringify(newTrip),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
                    .then((data) => {
                        travelers = data[0]
                        trips = data[1]
                        destinations = data[2]
                        showTrips()
                    })
                    .catch(err => console.log('To err is human', err))
            })
            .catch(err => console.log(err));
        daysBox.value = ''
        travelersBox.value = ''
        destinationSelector.value = 0
    }
}

function showTrips() {
    approvedTripList.innerHTML = '';
    pendingTripList.innerHTML = '';
    const approvedUserTrips = currentTraveler.getTravelerTrips(currentTraveler, trips, destinations, 'approved');
    approvedUserTrips.forEach(trip => {
        let key = Object.keys(trip)
        let value = Object.values(trip)
        approvedTripList.innerHTML += `<li>Where: ${key} When: ${value}</li>`
    })
    const pendingUserTrips = currentTraveler.getTravelerTrips(currentTraveler, trips, destinations, 'pending');
    pendingUserTrips.forEach(trip => {
        let key = Object.keys(trip)
        let value = Object.values(trip)
        pendingTripList.innerHTML += `<li>Where: ${key} When: ${value}</li>`
    })
    totalSpent.innerText = `Total Spent This Year: $${currentTraveler.getTotalSpentForYear(currentTraveler, trips, destinations, currentYear)}`;
}

function logIn() {
    travelers.travelers.forEach(traveler => {
        let username = `traveler${traveler.id}`;
        if (username === usernameBox.value && passwordBox.value === 'travel') {
            errorMessage.classList.add('hidden');
            logInPage.classList.add('hidden');
            mainPage.classList.remove('hidden');
            header.classList.remove('hidden')
            dateDisplay.classList.remove('hidden');
            currentTraveler = new Traveler(traveler.id, traveler.name, traveler.travelerType)
            nameDisplay.innerText = `Welcome ${currentTraveler.name}`
            showTrips();
        } else {
            errorMessage.classList.remove('hidden');
        }
    })
}