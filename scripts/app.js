var app = angular.module('app', ['ngResource', 'firebase']);

app.constant('FIREBASE_CONFIG', {
    apiKey: "AIzaSyB2T6Q7jrx-lx0bxHmhvMxFSIHHW9ldgsg",
    authDomain: "fir-crud-sample.firebaseapp.com",
    databaseURL: "https://fir-crud-sample.firebaseio.com",
    projectId: "fir-crud-sample",
    storageBucket: "fir-crud-sample.appspot.com",
    messagingSenderId: "183757689941"
});
app.config(function () {
});
app.run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG);
});
