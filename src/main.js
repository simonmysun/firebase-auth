import firebase from 'firebase';
import firebaseui from 'firebaseui';
import './../node_modules/firebaseui/dist/firebaseui.css';
import './styles.css';

const redirectUrl = '/';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: '',
};

const maskDom = document.getElementById('mask');
const signInBodyDom = document.getElementById('sign-in-body');
const signInStatusDom = document.getElementById('sign-in-status');
const signOutDom = document.getElementById('sign-out');
const welcomeMessageContainerDom = document.getElementById('welcome-message-container');
const switchAccountDom = document.getElementById('switch-account');
const cancelSwitchDom = document.getElementById('cancel-switch');

firebase.initializeApp(config);

window.addEventListener('load', () => {
  maskDom.style.display = 'none';
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const displayName = user.displayName ? user.displayName : 'Anonymous';
      const email = user.email ? `(${user.email})` : '';
      // const photoURL = user.photoURL;
      user.getToken().then(() => {
        signInStatusDom.textContent = `You have signed in as ${displayName} ${email}`;
        signOutDom.textContent = 'Sign out';
        welcomeMessageContainerDom.innerHTML = `<div id="welcome-message"><h2>Welcome</h2><h2>${displayName}</h2><p><a href="${redirectUrl}">Go back</p></a>`;
        signInBodyDom.classList.add('signed-in');
        signInBodyDom.classList.remove('switch');
      });
    } else {
      signInStatusDom.textContent = 'You are now signed out';
      signOutDom.textContent = '';
      signInBodyDom.classList.add('switch');
    }
  }, (error) => {
    console.log(error);
  });
});

const signOut = () => {
  firebase.auth().signOut().then(() => {
    welcomeMessageContainerDom.outerHTML = `<h2>Bye!</h2><a href="${redirectUrl}"><p>Go back</p></a>`;
  }, (error) => {
    console.error('Sign Out Error', error);
  });
};

const switchAccount = () => {
  signInBodyDom.classList.toggle('switch');
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInSuccessUrl: redirectUrl,
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'https://www.google.com/',
});

signOutDom.addEventListener('click', signOut);
signOutDom.addEventListener('touchstart', signOut);
switchAccountDom.addEventListener('click', switchAccount);
switchAccountDom.addEventListener('touchstart', switchAccount);
cancelSwitchDom.addEventListener('click', switchAccount);
cancelSwitchDom.addEventListener('touchstart', switchAccount);
