// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
//import User from '../src/User'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
//import './images/turing-logo.png'


const logInButton = document.getElementById('logInButton');
const logInPage = document.querySelector('.logInPage');
const mainPage = document.querySelector('.mainPage');
const emailBox = document.getElementById('emailBox');
const passwordBox = document.getElementById('passwordBox');

logInButton.addEventListener('click', logIn)

function logIn() {
    if (emailBox.value === 'traveler' && passwordBox.value === 'travel') {
        logInPage.classList.add('hidden')
        mainPage.classList.remove('hidden')
    } else {
        alert('wrong')
    }
}