import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

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

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base
