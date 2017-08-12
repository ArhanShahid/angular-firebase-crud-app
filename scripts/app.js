var app = angular.module('app', ['firebase']);

app.constant('FIREBASE_CONFIG', {
    apiKey: "AIzaSyDOUd98mu9fwR9-UEKKtI4KleQus5LVET0",
    authDomain: "fir-crud-sample-d2696.firebaseapp.com",
    databaseURL: "https://fir-crud-sample-d2696.firebaseio.com",
    projectId: "fir-crud-sample-d2696",
    storageBucket: "",
    messagingSenderId: "748482557474"
});
app.config(function () {
});
app.run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG);
});
