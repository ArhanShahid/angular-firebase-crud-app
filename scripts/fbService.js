app.service('fbService', function () {
    return {
        db: firebase.database().ref(),
        data: firebase.database().ref('data')
    }
});

