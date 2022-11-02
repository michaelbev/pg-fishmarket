import Rebase from 're-base'
import firebase from 'firebase/app'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDXUCNSpi5u07F76httlCTXAA4mPVQlEHs',
  authDomain: 'catch-of-the-day-a809e.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-a809e.firebaseio.com',
})

// const appCheck = firebase.appCheck()
// // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// // key is the counterpart to the secret key you set in the Firebase console.
// appCheck.activate('6LeedssiAAAAAI4Jdm_9YpcgelLuAWSBAKVTQQrE', true)

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
