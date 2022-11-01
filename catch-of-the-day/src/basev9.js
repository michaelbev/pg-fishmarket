import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const { initializeApp } = require('firebase/app')
const { initializeAppCheck, ReCaptchaV3Provider } = require('firebase/app-check')

const firebaseConfig = {
  apiKey: 'AIzaSyCg-3gDnn-xkVicfB_CwbeGSqag7_ENJ1s',
  authDomain: 'catch-of-the-day-a809e.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-a809e.firebaseio.com',
  // projectId: 'catch-of-the-day-a809e',
  // storageBucket: 'catch-of-the-day-a809e.appspot.com',
  // messagingSenderId: '35639451002',
  // appId: '1:35639451002:web:852017289757c2186f4ac3',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LeedssiAAAAAI4Jdm_9YpcgelLuAWSZAKVTQQrE'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
})

//FB8
// const appCheck = firebaseApp.appCheck()
// appCheck.activate('6LeedssiAAAAAI4Jdm_9YpcgelLuAWSBAKVTQQrE', true)

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base
