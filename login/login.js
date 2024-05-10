import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-NFpkwDdoMuv2NWAXHqOB-fWcVqiYuQA",
  authDomain: "application-4b60a.firebaseapp.com",
  projectId: "application-4b60a",
  storageBucket: "application-4b60a.appspot.com",
  messagingSenderId: "835748855375",
  appId: "1:835748855375:web:099c5ab4bed958bdcb343a",
  measurementId: "G-SETFCKQD1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
auth.languageCode = 'it';

var back = document.getElementById('back')
var gridContainer = document.getElementById('grid-container')
back.addEventListener('click', ()=>{
  gridContainer.style.display = 'grid'
  document.getElementById('parent').innerHTML = '';   
  back.style.display = 'none' 
})

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'login-button', {
    'size': 'invisible',
    // 'callback': (response) => {
    //   // reCAPTCHA solved, allow signInWithPhoneNumber.
    //   //onSignInSubmit();
    // }
  });

  var phoneDiv = document.getElementById('phone')
  var passDiv = document.getElementById('pass')
  var wrapper = document.getElementById('wrapper')
  var affordability = document.getElementById('affordability')
// Function to handle phone sign-in
function handlePhoneSignIn() {
  const phoneNumberInput = document.getElementById('phoneNumberInput');
  const phoneNumber = phoneNumberInput.value;
  const appVerifier = window.recaptchaVerifier;
  console.log(phoneNumber)
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message.
      // Save confirmation result for later use.
      window.confirmationResult = confirmationResult;
      checkButton = true;
      // You may want to prompt the user to enter the verification code here.
        login.textContent = "login"
        login.style.background = 'green'
        login.style.color = 'white'
        phoneDiv.style.display = 'none'
        passDiv.style.display = 'block'
    })
    .catch((error) => {
        console.log(error)
      // Error handling
      console.error("Error sending SMS:", error);
    });
}
// Function to handle verification code confirmation
function handleVerificationCodeConfirmation() {

    const codeInput = document.getElementById('codeInput');
    const code = codeInput.value;
  
    // Get the confirmation result from the window object
    const confirmationResult = window.confirmationResult;
  
    // Confirm the verification code
    confirmationResult.confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user)
        checkButton = false;
        // You can perform further actions here, such as redirecting the user.
        wrapper.style.display = 'none'
        affordability.style.display = 'block'
        
      })
      .catch((error) => {
          console.log(error)
        // User couldn't sign in (bad verification code?)
        // Handle the error here.
        console.error("Error confirming verification code:", error);
      });
  }

var checkButton = false;
// Event listener for form submission (or button click) to initiate phone sign-in
const login = document.getElementById('login-button');
login.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission (if using a form)
  console.log(checkButton)
  if(checkButton){
    handleVerificationCodeConfirmation();

  }else{
    handlePhoneSignIn();
  }
  
});



var startApplication = document.getElementById('start-application');
startApplication.addEventListener('click', function(event){
  loadNewContent('start-application/start-application');
})
var schedule = document.getElementById('schedule');
schedule.addEventListener('click', function(event){
  loadNewContent('loan-schedule/schedule');
})

function loadNewContent(container) {
  // Fetch the new HTML file
  gridContainer.style.display = 'none'
  back.style.display = 'block'
  fetch('/' + container + '.html')
      .then(response => response.text())
      .then(html => {
          // Replace the content of the container with the new HTML
          document.getElementById('parent').innerHTML = html;
      })
      .catch(error => console.error('Error loading new content:', error));
}


