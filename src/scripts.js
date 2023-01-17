// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import Traveler from '../src/traveler';
import { getAPIData } from './apiCalls';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//import './images/turing-logo.png'


let currentTraveler = new Traveler(2, "Rachael Vaughten", "thrill-seeker");
let travelers;
let trips;
let destinations;
const currentYear = '2020';

const logInButton = document.getElementById('logInButton');
const logInPage = document.querySelector('.logInPage');
const mainPage = document.querySelector('.mainPage');
const emailBox = document.getElementById('emailBox');
const passwordBox = document.getElementById('passwordBox');
const errorMessage = document.getElementById('errorMessage');
const tripList = document.getElementById('tripList');
const totalSpent = document.getElementById('totalSpent');
const destinationSelector = document.getElementById('destinationSelector');
const bookButton = document.getElementById('bookButton');
const dateBox = document.getElementById('dateBox');
const daysBox = document.getElementById('daysBox');
const travelersBox = document.getElementById('travelersBox');

window.addEventListener('load', getAllData)
logInButton.addEventListener('click', logIn)
bookButton.addEventListener('click', bookTrip)

function bookTrip() {

    //  After making these selections, I should see an estimated cost (with a 10% travel agent fee) for the trip.
    // Once I submit the trip request, it will show on my dashboard as “pending” so that the travel agency can approve or deny it.

    //trip {
    //     id: 1,
    //     userID: 44,
    //     destinationID: 49,
    //     travelers: 1,
    //     date: "2022/09/16",
    //     duration: 8,
    //     status: "approved",
    //     suggestedActivities: [ ]
    // }
    //destination {
    //     id: 1,
    //     destination: "Lima, Peru",
    //     estimatedLodgingCostPerDay: 70,
    //     estimatedFlightCostPerPerson: 400,
    //     image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    //     alt: "overview of city buildings with a clear sky"
    // }



    if (dateBox.value && daysBox.value > 0 && travelersBox.value > 0 && destinationSelector.value != 0) {

        const correctDestination = destinations.destinations.find(destination => destination.destination === destinationSelector.value)
        const lastTrip = trips.trips.at(-1);

        const newTrip = {
            id: lastTrip.id++,
            userID: currentTraveler.id,
            destinationID: correctDestination.id,
            travelers: travelersBox.value,
            date: "2022/09/16",
            duration: daysBox.value,
            status: "pending",
            suggestedActivities: []
        }
    }
}

function getAllData() {
    Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
        .then((data) => {
            travelers = data[0]
            trips = data[1]
            destinations = data[2]
            showTrips()
        })
        .catch(err => console.log('To err is human', err))
}

function showTrips() {
    destinations.destinations.forEach(destination => {
        destinationSelector.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
    })
    const userTrips = currentTraveler.getTravelerTrips(currentTraveler, trips, destinations);
    userTrips.forEach(trip => {
        let key = Object.keys(trip)
        let value = Object.values(trip)
        tripList.innerHTML += `<li>Where: ${key} When: ${value}</li>`
    })
    totalSpent.innerText = `$${currentTraveler.getTotalSpentForYear(currentTraveler, trips, destinations, currentYear)}`
}

function logIn() {
    if (emailBox.value === 'traveler' && passwordBox.value === 'travel') {
        errorMessage.classList.add('hidden');
        logInPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
    } else {
        errorMessage.classList.remove('hidden');
    }
}