import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCwagV4zJdRYz_pGXZy-cHEycEXpBMPZ1g",
  authDomain: "eiga-de72c.firebaseapp.com",
  databaseURL: "https://eiga-de72c.firebaseio.com",
  projectId: "eiga-de72c",
  storageBucket: "eiga-de72c.appspot.com",
  messagingSenderId: "687294033476"
};

const app = firebase.initializeApp(config);
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { app, facebookProvider, githubProvider, twitterProvider, googleProvider };
