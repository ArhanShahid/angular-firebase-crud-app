app.service('fbService', function () {
    return {
        data: firebase.database().ref('data')
    }
});

