// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import Traveler from '../src/traveler';
import { getAPIData } from './apiCalls';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//import './images/turing-logo.png'

let currentTraveler = new Traveler(1, "Ham Leadbeater", "relaxer");
let travelers;
let trips;
let destinations;

const logInButton = document.getElementById('logInButton');
const logInPage = document.querySelector('.logInPage');
const mainPage = document.querySelector('.mainPage');
const emailBox = document.getElementById('emailBox');
const passwordBox = document.getElementById('passwordBox');
const errorMessage = document.getElementById('errorMessage');

logInButton.addEventListener('click', logIn)
window.addEventListener('load', getAllData)

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
    console.log('travelers', travelers)
    console.log('trips', trips)
    console.log('destinations', destinations)
    //currentTraveler.getTravelerTrips(currentTraveler, trips, destinations);
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





//All of my trips (past, upcoming and pending)
// {
//     id: 1,
//     name: "Ham Leadbeater",
//     travelerType: "relaxer"
// }