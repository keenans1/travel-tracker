// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import Traveler from '../src/traveler';
import { getAPIData } from './apiCalls';
import * as dayjs from 'dayjs';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//import './images/turing-logo.png'


//let currentTraveler = new Traveler(2, "Rachael Vaughten", "thrill-seeker");
let currentTraveler;
let travelers;
let trips;
let destinations;
const currentDate = new Date();
const currentYear = currentDate.getFullYear().toString();

const logInButton = document.getElementById('logInButton');
const logInPage = document.querySelector('.logInPage');
const mainPage = document.querySelector('.mainPage');
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
document.getElementById('dateBox').setAttribute('min', new Date().toISOString().split('T')[0]);
const tripCost = document.getElementById('tripCost');
const nameDisplay = document.getElementById('nameDisplay');

window.addEventListener('load', getAllData)
logInButton.addEventListener('click', logIn)
bookButton.addEventListener('click', bookTrip)

setInterval(displayTripCost, 300)

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
    }
}

function calculateTripCost(trip, destination) {
    const abc = trip.travelers * destination.estimatedFlightCostPerPerson
    const def = trip.duration * destination.estimatedLodgingCostPerDay
    const beforeFee = abc + def;
    const afterFee = Number((beforeFee * 1.1).toFixed(0));
    console.log('final cost', afterFee)
    return afterFee
}

function bookTrip() {

    // After making these selections, I should see an estimated cost (with a 10% travel agent fee) for the trip.

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

        //tripCost.innerText = calculateTripCost(newTrip, correctDestination)

        // const abc = newTrip.travelers * correctDestination.estimatedFlightCostPerPerson
        // const def = newTrip.duration * correctDestination.estimatedLodgingCostPerDay
        // const beforeFee = abc + def;
        // const afterFee = Number((beforeFee * 1.1).toFixed(0));
        // console.log('final cost', afterFee)

        approvedTripList.innerHTML = '';
        pendingTripList.innerHTML = '';

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
                getAllData()
            })
            .catch(err => console.log(err));
    }
}

function getAllData() {
    Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
        .then((data) => {
            travelers = data[0]
            trips = data[1]
            destinations = data[2]
            //showTrips()
        })
        .catch(err => console.log('To err is human', err))
}

function showTrips() {

    destinations.destinations.forEach(destination => {
        destinationSelector.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
    })

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

    totalSpent.innerText = `$${currentTraveler.getTotalSpentForYear(currentTraveler, trips, destinations, currentYear)}`

    dateDisplay.innerText += currentDate.toLocaleDateString();
}

function logIn() {

    // const username = usernameBox.value;
    // if (username.length === 9) {
    //     let word = username.slice(0, 8);
    //     let number = parseInt(username.slice(-1))
    //     console.log('word', word)
    //     console.log('number', number)
    //     // test NAN
    //     if (word === 'traveler' && number > 0 && number < 51) {

    //     }
    // }

    // map through trips travelers
    // each iteration create an object wiht a key of traveler id++ and a value of id ++
    // iterate through the database and check if the username is a key

    const userNameDatabase = travelers.travelers.map(traveler => {
        let key = `traveler${traveler.id}`;
        //console.log('key', key)
        let obj = { [key]: `${traveler.id}` }
        //console.log('obj', obj)
        let value = parseInt(Object.values(obj))
        //console.log('value', value)
        if (key === usernameBox.value && passwordBox.value === 'travel') {
            errorMessage.classList.add('hidden');
            logInPage.classList.add('hidden');
            mainPage.classList.remove('hidden');
            dateDisplay.classList.remove('hidden');
            currentTraveler = new Traveler(traveler.id, traveler.name, traveler.travelerType)
            showTrips();
            nameDisplay.innerText = `Welcome ${currentTraveler.name}`
            return currentTraveler
            //console.log('found', obj)
        } else {
            errorMessage.classList.remove('hidden');
        }

    })

    // userNameDatabase.find(username => {
    //     let key = Object.keys(username)
    //     if (usernameBox.value === key) {
    //         console.log(username)
    //     }
    // })




    // if (usernameBox.value === 'traveler' && passwordBox.value === 'travel') {
    //     errorMessage.classList.add('hidden');
    //     logInPage.classList.add('hidden');
    //     mainPage.classList.remove('hidden');
    //     dateDisplay.classList.remove('hidden');
    // } else {
    //     errorMessage.classList.remove('hidden');
    // }
}